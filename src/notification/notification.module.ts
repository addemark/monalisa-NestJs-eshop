import { Module } from "@nestjs/common";
import { SmsService } from "./sms/sms.service";
import { SmsController } from "./sms/sms.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/authenticate/entity/user.entity";
import { ConfigModule } from "@nestjs/config";
import { SmsNotificationRepository } from "src/notification/repositories/smsNotification.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule.forRoot()],
  controllers: [SmsController],
  providers: [SmsService, SmsNotificationRepository],
})
export class NotificationModule {}
