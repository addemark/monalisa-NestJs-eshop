import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/authenticate/entity/user.entity";
import { CreateUserDto, UserResponseDto } from "src/authenticate/dto/user.dto";
import { Roles } from "src/authenticate/entity/roles.entity";
import * as crypto from "crypto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(
    authCredentialsDto: CreateUserDto,
    role: Roles
  ): Promise<UserResponseDto> {
    const { phone, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const phoneVerificationCode = crypto
      .randomBytes(48)
      .toString("hex")
      .slice(0, 6);
    const roles = [role];
    const user = this.create({
      phoneNumber: phone,
      password: hashPass,
      roles: roles,
      phoneVerificationCode,
    });

    await this.save(user);
    return {
      encryptedUID: user.id,
      role: user.roles,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    };
  }
}
