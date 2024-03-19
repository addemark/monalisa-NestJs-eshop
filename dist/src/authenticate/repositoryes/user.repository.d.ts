import { DataSource, Repository } from "typeorm";
import { User } from "src/authenticate/entity/user.entity";
import { CreateUserDto, UserResponseDto } from "src/authenticate/dto/user.dto";
import { Roles } from "src/authenticate/entity/roles.entity";
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    createUser(authCredentialsDto: CreateUserDto, role: Roles): Promise<UserResponseDto>;
}
