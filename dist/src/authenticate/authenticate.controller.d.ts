import { FastifyReply } from "fastify";
import { AuthenticateService } from "src/authenticate/authenticate.service";
import { ConfirmationResponseDto, CreateUserDto, PhoneConfirmationDto, UserResponseDto } from "src/authenticate/dto/user.dto";
import { User } from "src/authenticate/entity/user.entity";
export declare class AuthenticateController {
    private authService;
    constructor(authService: AuthenticateService);
    signUp(signupCredentials: CreateUserDto): Promise<UserResponseDto>;
    phoneConfirm(confirmObj: PhoneConfirmationDto): Promise<ConfirmationResponseDto>;
    signIn(signupCredentials: CreateUserDto, response: FastifyReply): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    deleteAccount(userCredentials: CreateUserDto, response: FastifyReply, user: User): Promise<void>;
    test(req: any, user: User): string;
}
