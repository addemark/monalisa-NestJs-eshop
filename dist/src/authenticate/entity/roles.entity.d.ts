import { User } from "src/authenticate/entity/user.entity";
import { Role } from "../types/roles.types";
export declare class Roles {
    id: string;
    version: number | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    users: User[];
}
