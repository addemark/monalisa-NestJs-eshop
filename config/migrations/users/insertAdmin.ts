import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

export class PostRefactoringTIMESTAMP implements MigrationInterface {
  name = "ADD_ADMIN1710869376487";
  async up(queryRunner: QueryRunner): Promise<void> {
    const password = process.env.ADMIN_PASSWORD;
    const phone = process.env.ADMIN_PHONE; // the phone must be valid starts with the country prefix
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    await queryRunner.query(
      `INSERT INTO "user" ( "phoneNumber", "password", "phoneVerified") VALUES ($1,$2,$3)`,
      [phone, hashPass, true]
    );
    await queryRunner.query(
      `INSERT INTO "user_roles" ("userId","rolesId")
       VALUES ((SELECT "id" AS "userId" FROM "user" WHERE "phoneNumber" = $1) ,
       (SELECT "id" AS "rolesId" FROM "roles" WHERE "role" = $2))
        `,
      [phone, "ADMIN"]
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const phone = process.env.ADMIN_PHONE;
    await queryRunner.query(
      `DELETE FROM "user_roles" WHERE "userId" IN (SELECT "id" FROM "user" WHERE "phoneNumber" = $1)`,
      [phone]
    ); // reverts things made in "up" method
    await queryRunner.query(`DELETE FROM "user" WHERE "phoneNumber" = $1 `, [
      phone,
    ]); // reverts things made in "up" method
  }
}
