import { Role } from 'src/authenticate/types/roles.types';
import { IsBoolean, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MinLength(2)
  role: Role;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @MinLength(2)
  role: Role;
  @IsNumber()
  version: number;
  @IsBoolean()
  isDeleted: boolean;
}

export class RoleResponseDto {
  role: Role;
  version: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
