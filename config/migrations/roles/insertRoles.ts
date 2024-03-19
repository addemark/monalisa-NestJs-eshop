import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoringTIMESTAMP implements MigrationInterface {
  name = "ADD_ROLES1710865673389";
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles (role)
       VALUES ('ADMIN'),('USER'),('CURATOR'),('CREATOR') `
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM roles WHERE role IN ('ADMIN','USER','CURATOR','CREATOR')`
    ); // reverts things made in "up" method
  }
}
