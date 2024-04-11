import { Roles } from "src/authenticate/entity/roles.entity";
import { SmsNotification } from "src/notification/entity/smsNotification.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: true, unique: true, default: null })
  email: string;

  @Column({ nullable: true, unique: true, default: null })
  phoneNumber: string;
  @Column({ nullable: false })
  password: string;

  @VersionColumn({
    nullable: true,
    default: 1,
  })
  version: number | null;
  @Column({ nullable: false, default: false })
  isDeleted: boolean;
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
  @Column({
    nullable: false,
    default: false,
  })
  emailVerified: boolean;
  @Column({
    nullable: true,
    default: null,
  })
  emailVerificationCode: string;
  @Column({
    nullable: false,
    default: false,
  })
  phoneVerified: boolean;
  @Column({
    nullable: true,
    default: null,
  })
  phoneVerificationCode: string;
  @ManyToMany(() => Roles, (role) => role.users, { eager: true })
  @JoinTable({ name: "user_roles" })
  roles: Roles[];
  @Column({
    nullable: true,
  })
  refreshToken: string;
  @OneToMany(() => SmsNotification, (notification) => notification.user)
  smsNotifications: SmsNotification[];
}
