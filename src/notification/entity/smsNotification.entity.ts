import { User } from "src/authenticate/entity/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class SmsNotification {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false, unique: true })
  notificationId: string;
  @CreateDateColumn({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
  })
  createdAt: Date;
  @UpdateDateColumn({
    nullable: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
  @VersionColumn({
    nullable: true,
    default: 1,
  })
  version: number | null;
  @Column({ nullable: false, default: false })
  status: string;
  @ManyToOne(() => User, (user) => user.smsNotifications)
  user: User;
}
