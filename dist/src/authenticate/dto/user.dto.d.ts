import { Roles } from "src/authenticate/entity/roles.entity";
export declare class CreateUserDto {
    phone: string;
    password: string;
}
export declare class UserResponseDto {
    encryptedUID: string;
    role: Roles[];
    emailVerified: boolean;
    phoneVerified: boolean;
}
export declare class PhoneConfirmationDto {
    phone: string;
    code: string;
}
export declare class ConfirmationResponseDto {
    phone: string;
    confirmation: boolean;
}
