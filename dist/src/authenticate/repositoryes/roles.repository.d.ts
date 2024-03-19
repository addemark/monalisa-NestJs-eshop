import { CreateRoleDto, RoleResponseDto } from "src/authenticate/dto/roles.dto";
import { Roles } from "src/authenticate/entity/roles.entity";
import { DataSource, Repository } from "typeorm";
export declare class RolesRepository extends Repository<Roles> {
    private dataSource;
    constructor(dataSource: DataSource);
    addNewRole({ role }: CreateRoleDto): Promise<RoleResponseDto>;
}
