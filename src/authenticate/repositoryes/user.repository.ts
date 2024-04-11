import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/authenticate/entity/user.entity";
import { CreateUserDto, UserResponseDto } from "src/authenticate/dto/user.dto";
import { Roles } from "src/authenticate/entity/roles.entity";
import * as crypto from "crypto";
import { sendNotification } from "lib/notifier";

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

    const phoneVerificationCode = crypto
      .randomBytes(48)
      .toString("hex")
      .slice(0, 6);

    const roles = [role];
    const user = this.create({
      phoneNumber: phone,
      password: await bcrypt.hash(password, salt),
      roles: roles,
      phoneVerificationCode: await bcrypt.hash(phoneVerificationCode, salt),
    });

    sendNotification({
      authToken: process.env.TWILIO_AUTH_TOKEN,
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      twilioNumber: process.env.TWILIO_PHONE,
      message: `your verification code is ${phoneVerificationCode}`,
      destinationNumber: phone,
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
