import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { sendNotification } from "lib/notifier";
import {
  ResendSmsDto,
  SmsNotificationResponseDto,
} from "src/notification/dto/sms.dto";
import { SmsNotification } from "src/notification/entity/smsNotification.entity";
import { SmsNotificationRepository } from "src/notification/repositories/smsNotification.repository";
import { Twilio } from "twilio";
import { FindManyOptions, FindOptionsWhere, In } from "typeorm";

@Injectable()
export class SmsService {
  constructor(private smsRepository: SmsNotificationRepository) {}
  async resendSMS(
    resendData: ResendSmsDto
  ): Promise<SmsNotificationResponseDto> {
    const { phoneNumber } = resendData;
    try {
      const notification = await this.smsRepository.find({
        relations: { user: true },
        where: {
          status: In(["queued", "canceled", "failed"]),
          user: {
            phoneNumber: phoneNumber,
          },
        },
      });

      if (!notification.length)
        throw new Error("No notification has been send");
      const client = new Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      notification.forEach((element) => {
        client
          .messages(element.notificationId)
          .fetch()
          .then((message) => {
            if (message.status !== "delivered")
              sendNotification({
                authToken: process.env.TWILIO_AUTH_TOKEN,
                accountSid: process.env.TWILIO_ACCOUNT_SID,
                twilioNumber: process.env.TWILIO_PHONE,
                message: message.body,
                destinationNumber: phoneNumber,
                callBackFunction: this.smsRepository.saveSmsNotification,
                user: element.user,
              });
            console.log("000000000", message);
          })
          .catch((error) => {
            throw new InternalServerErrorException("error resending message");
          });
      });
      return { phoneNumber, messageSent: true, message: "NOTIFICATION RESEND" };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "unknown error";
      throw new NotFoundException(message);
    }
  }
}
