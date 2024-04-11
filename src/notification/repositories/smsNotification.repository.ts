import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { SmsNotification } from "src/notification/entity/smsNotification.entity";
import { User } from "src/authenticate/entity/user.entity";

@Injectable()
export class SmsNotificationRepository extends Repository<SmsNotification> {
  constructor(private dataSource: DataSource) {
    super(SmsNotification, dataSource.createEntityManager());
  }

  saveSmsNotification = async (
    notificationId: string,
    status: string,
    user: User
  ) => {
    try {
      const notification = this.create({
        status,
        notificationId,
        user,
      });
      this.save(notification);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown Error";
      throw new InternalServerErrorException(message);
    }
  };
}
