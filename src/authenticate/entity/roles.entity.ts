import { Exclude } from "class-transformer";
import { User } from "src/authenticate/entity/user.entity";
import { Role } from "../types/roles.types";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class Roles {
  @PrimaryGeneratedColumn("uuid")
  id: string;
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
  @Column({ nullable: false, unique: true })
  role: Role;
  @Exclude({ toPlainOnly: true })
  @ManyToMany(() => User, (user) => user.roles, { lazy: true })
  users: User[];
}
