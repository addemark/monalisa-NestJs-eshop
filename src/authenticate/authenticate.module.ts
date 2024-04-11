import { Module } from "@nestjs/common";
import { AuthenticateController } from "./authenticate/authenticate.controller";
import { AuthenticateService } from "./authenticate/authenticate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/authenticate/entity/user.entity";
import { UserRepository } from "src/authenticate/repositories/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { Roles } from "src/authenticate/entity/roles.entity";
import { JwtStrategy } from "src/authenticate/strategy/jwt.strategy";
import { RolesController } from "src/authenticate/roles/roles.controller";
import { RolesRepository } from "src/authenticate/repositories/roles.repository";
import { RolesService } from "src/authenticate/roles/roles.service";
import { UserHasRoleGuard } from "src/authenticate/guards/has-role.guard";
import { ConfigModule } from "@nestjs/config";
import { SmsNotificationRepository } from "src/notification/repositories/smsNotification.repository";
import { SmsNotification } from "src/notification/entity/smsNotification.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles, SmsNotification]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthenticateController, RolesController],
  providers: [
    AuthenticateService,
    RolesService,
    UserRepository,
    RolesRepository,
    JwtStrategy,
    UserHasRoleGuard,
    SmsNotificationRepository,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticateModule {}
