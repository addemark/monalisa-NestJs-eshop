import { Module } from "@nestjs/common";
import { SmsService } from "./sms/sms.service";
import { SmsController } from "./sms/sms.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/authenticate/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SmsController],
  providers: [SmsService],
})
export class NotificationModule {}
