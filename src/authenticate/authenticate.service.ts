import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import * as crypto from "crypto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { FastifyReply } from "fastify";
import {
  ConfirmationResponseDto,
  CreateUserDto,
  PhoneConfirmationDto,
  UserResponseDto,
} from "src/authenticate/dto/user.dto";
import { RolesRepository } from "src/authenticate/repositoryes/roles.repository";
import { UserRepository } from "src/authenticate/repositoryes/user.repository";
import { Role } from "src/authenticate/types/roles.types";
import { User } from "src/authenticate/entity/user.entity";

@Injectable()
export class AuthenticateService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private rolesRepository: RolesRepository
  ) {}

  async signUp(creteUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const role = await this.rolesRepository.find({
        where: { role: Role.USER, isDeleted: false },
      });
      return await this.userRepository.createUser(creteUserDto, role[0]);
    } catch (error) {
      if (error.code === "23505")
        throw new ConflictException("phone it is used");
      else throw new InternalServerErrorException();
    }
  }
  async signIn(
    authCredentialsDto: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { phone, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: { phoneNumber: phone, isDeleted: false, phoneVerified: true },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Please check credentials");
    }
    const salt = await bcrypt.genSalt();
    const refreshToken = crypto.randomBytes(24).toString("hex");
    user.refreshToken = await bcrypt.hash(refreshToken, salt);
    this.userRepository.save(user);
    const roles = user.roles
      .filter((role) => !role.isDeleted)
      .map((element) => element.role);
    const payload = { encryptedUID: user.id, roles };
    const accessToken: string = await this.jwtService.sign(payload);

    response.setCookie("token", JSON.stringify({ accessToken, refreshToken }));
    return { accessToken, refreshToken };
  }
  async confirmPhoneNumber(
    confirmObj: PhoneConfirmationDto
  ): Promise<ConfirmationResponseDto> {
    const { phone, code } = confirmObj;
    const user = await this.userRepository.findOne({
      where: {
        phoneNumber: phone,
        isDeleted: false,
        phoneVerificationCode: code,
      },
    });
    if (!user) return { phone, confirmation: false };
    user.phoneVerified = true;
    user.phoneVerificationCode = null;
    this.userRepository.save(user);
    return { phone, confirmation: true };
  }
  async deleteAccount(
    userCredentials: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply,
    user: User
  ) {
    const { phone, password } = userCredentials;

    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      phone !== user.phoneNumber
    ) {
      throw new UnauthorizedException("Please check credentials");
    }
    user.phoneNumber = null;
    user.email = null;
    user.isDeleted = true;
    user.refreshToken = null;
    this.userRepository.save(user);
    response.setCookie("token", "", { expires: new Date(0) });
    response.status(200).send({ message: "Account deleted" });
  }
}
