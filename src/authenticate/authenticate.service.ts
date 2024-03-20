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
  UserActionResponse,
  UserResponseDto,
} from "src/authenticate/dto/user.dto";
import { RolesRepository } from "src/authenticate/repositoryes/roles.repository";
import { UserRepository } from "src/authenticate/repositoryes/user.repository";
import { Role } from "src/authenticate/types/roles.types";
import { User } from "src/authenticate/entity/user.entity";
import { Cookies } from "src/authenticate/decorator/get-cookies.decorator";
import { Z_UNKNOWN } from "zlib";

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

    response.setCookie(
      "token",
      JSON.stringify({ accessToken, refreshToken, encryptedUID: user.id })
    );
    return { accessToken, refreshToken };
  }

  async refreshTokenUsingCookies(
    @Res({ passthrough: true }) response: FastifyReply,
    token: string
  ): Promise<UserActionResponse> {
    try {
      const { refreshToken, encryptedUID } = JSON.parse(token);
      if (!refreshToken || !encryptedUID) throw new Error("Data not valid");
      const user = await this.userRepository.findOne({
        where: { id: encryptedUID, isDeleted: false, phoneVerified: true },
      });
      if (!user || !(await bcrypt.compare(refreshToken, user.refreshToken)))
        throw new Error("user or refresh token not valid");
      const roles = user.roles
        .filter((role) => !role.isDeleted)
        .map((element) => element.role);
      const payload = { encryptedUID, roles };
      const accessToken: string = await this.jwtService.sign(payload);
      response.setCookie(
        "token",
        JSON.stringify({ accessToken, refreshToken, encryptedUID })
      );
    } catch (e: unknown) {
      response.setCookie("token", "", { expires: new Date(0) });
      return { message: "token not updated", confirmation: false };
    }
    return { message: "token updated", confirmation: true };
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
    // response.status(200).send({ message: "Account deleted" });
    return { message: "Account deleted", confirmation: true };
  }

  async logOut(
    @Res({ passthrough: true }) response: FastifyReply,
    user: User
  ): Promise<UserActionResponse> {
    if (!user) throw new UnauthorizedException("Please check credentials");
    response.setCookie("token", "", { expires: new Date(0) });
    user.refreshToken = null;
    this.userRepository.update(user.id, user);
    return { message: "you are logged out", confirmation: true };
  }
}
