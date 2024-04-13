import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  Matches,
  MinLength,
} from "class-validator";

export class ResendSmsDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class SmsNotificationResponseDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
  @IsNotEmpty()
  @IsBoolean()
  messageSent: boolean;
  @IsNotEmpty()
  @MinLength(2)
  message: string;
}
