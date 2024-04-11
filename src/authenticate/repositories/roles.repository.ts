import { Injectable } from "@nestjs/common";
import { CreateRoleDto, RoleResponseDto } from "src/authenticate/dto/roles.dto";
import { Roles } from "src/authenticate/entity/roles.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RolesRepository extends Repository<Roles> {
  constructor(private dataSource: DataSource) {
    super(Roles, dataSource.createEntityManager());
  }
  async addNewRole({ role }: CreateRoleDto): Promise<RoleResponseDto> {
    const newRole = this.create({ role, isDeleted: false });
    await this.save(newRole);
    return newRole;
  }
}
