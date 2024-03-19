import { Roles } from "src/authenticate/entity/roles.entity";
export declare class User {
    id: string;
    email: string;
    phoneNumber: string;
    password: string;
    version: number | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    emailVerificationCode: string;
    phoneVerified: boolean;
    phoneVerificationCode: string;
    roles: Roles[];
    refreshToken: string;
}
