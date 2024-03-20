import {
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  Matches,
  MinLength,
} from "class-validator";
import { Roles } from "src/authenticate/entity/roles.entity";

export class CreateUserDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @MinLength(6)
  @Matches(
    /(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}/,
    { message: "Password to week" }
  )
  password: string;
}

export class UserResponseDto {
  @IsNotEmpty()
  encryptedUID: string;
  @IsNotEmpty()
  role: Roles[];
  emailVerified: boolean;
  phoneVerified: boolean;
}

export class PhoneConfirmationDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
  @Length(6)
  @IsNotEmpty()
  code: string;
}

export class ConfirmationResponseDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
  confirmation: boolean;
}
export class UserActionResponse {
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  confirmation: boolean;
}
