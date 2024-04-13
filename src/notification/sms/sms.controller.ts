import { Body, Controller, Post } from "@nestjs/common";
import {
  ResendSmsDto,
  SmsNotificationResponseDto,
} from "src/notification/dto/sms.dto";
import { SmsService } from "src/notification/sms/sms.service";

@Controller("sms")
export class SmsController {
  constructor(private smsService: SmsService) {}
  @Post("/resend")
  resend(
    @Body() resendData: ResendSmsDto
  ): Promise<SmsNotificationResponseDto> {
    return this.smsService.resendSMS(resendData);
  }
}
