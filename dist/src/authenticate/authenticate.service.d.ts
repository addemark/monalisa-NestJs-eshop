import { JwtService } from "@nestjs/jwt";
import { FastifyReply } from "fastify";
import { ConfirmationResponseDto, CreateUserDto, PhoneConfirmationDto, UserResponseDto } from "src/authenticate/dto/user.dto";
import { RolesRepository } from "src/authenticate/repositoryes/roles.repository";
import { UserRepository } from "src/authenticate/repositoryes/user.repository";
import { User } from "src/authenticate/entity/user.entity";
export declare class AuthenticateService {
    private userRepository;
    private jwtService;
    private rolesRepository;
    constructor(userRepository: UserRepository, jwtService: JwtService, rolesRepository: RolesRepository);
    signUp(creteUserDto: CreateUserDto): Promise<UserResponseDto>;
    signIn(authCredentialsDto: CreateUserDto, response: FastifyReply): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    confirmPhoneNumber(confirmObj: PhoneConfirmationDto): Promise<ConfirmationResponseDto>;
    deleteAccount(userCredentials: CreateUserDto, response: FastifyReply, user: User): Promise<void>;
}
