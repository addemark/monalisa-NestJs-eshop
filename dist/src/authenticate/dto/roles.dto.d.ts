import { Role } from 'src/authenticate/types/roles.types';
export declare class CreateRoleDto {
    role: Role;
}
export declare class UpdateRoleDto {
    role: Role;
    version: number;
    isDeleted: boolean;
}
export declare class RoleResponseDto {
    role: Role;
    version: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
