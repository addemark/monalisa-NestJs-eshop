import { Module } from "@nestjs/common";
import { AuthenticateController } from "./authenticate/authenticate.controller";
import { AuthenticateService } from "./authenticate/authenticate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/authenticate/entity/user.entity";
import { UserRepository } from "src/authenticate/repositoryes/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { Roles } from "src/authenticate/entity/roles.entity";
import { JwtStrategy } from "src/authenticate/strategy/jwt.strategy";
import { RolesController } from "src/authenticate/roles/roles.controller";
import { RolesRepository } from "src/authenticate/repositoryes/roles.repository";
import { RolesService } from "src/authenticate/roles/roles.service";
import { UserHasRoleGuard } from "src/authenticate/guards/has-role.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles]),
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
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticateModule {}
