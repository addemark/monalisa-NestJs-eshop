import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FastifyReply } from "fastify";
import { AuthenticateService } from "src/authenticate/authenticate.service";
import { Cookies } from "src/authenticate/decorator/get-cookies.decorator";
import { GetUser } from "src/authenticate/decorator/get-user.decorator";
import { Roles } from "src/authenticate/decorator/roles.decorator";
import {
  ConfirmationResponseDto,
  CreateUserDto,
  PhoneConfirmationDto,
  UserActionResponse,
  UserResponseDto,
} from "src/authenticate/dto/user.dto";
import { User } from "src/authenticate/entity/user.entity";
import { UserHasRoleGuard } from "src/authenticate/guards/has-role.guard";
import { Role } from "src/authenticate/types/roles.types";

@Controller("authenticate")
export class AuthenticateController {
  constructor(private authService: AuthenticateService) {}

  @Post("/signup")
  signUp(@Body() signupCredentials: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.signUp(signupCredentials);
  }

  @Post("/phone-confirm")
  phoneConfirm(
    @Body() confirmObj: PhoneConfirmationDto
  ): Promise<ConfirmationResponseDto> {
    return this.authService.confirmPhoneNumber(confirmObj);
  }

  @Post("/signin")
  signIn(
    @Body() signupCredentials: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(signupCredentials, response);
  }

  @Get("/refresh-token-cookie")
  refreshToken(
    @Res({ passthrough: true }) response: FastifyReply,
    @Cookies("token") token: string
  ): Promise<UserActionResponse> {
    return this.authService.refreshTokenUsingCookies(response, token);
  }

  @Post("/delete-account")
  @UseGuards(AuthGuard())
  deleteAccount(
    @Body() userCredentials: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply,
    @GetUser() user: User
  ): Promise<UserActionResponse> {
    return this.authService.deleteAccount(userCredentials, response, user);
  }

  @Post("/logout")
  @UseGuards(AuthGuard())
  logOut(
    @Res({ passthrough: true }) response: FastifyReply,
    @GetUser() user: User
  ): Promise<UserActionResponse> {
    return this.authService.logOut(response, user);
  }

  @Get("/guard")
  @Roles(Role.ADMIN)
  @UseGuards(UserHasRoleGuard)
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUser() user: User) {
    // const roles = user.roles;
    // let hasAdminRole = false;
    // roles.forEach((element) => {
    //   hasAdminRole = element.role == Role.ADMIN;
    // });
    // if (!hasAdminRole)
    //   throw new UnauthorizedException('No access to this module');
    console.log("[***tet**]", user);

    return "test";
  }
}
