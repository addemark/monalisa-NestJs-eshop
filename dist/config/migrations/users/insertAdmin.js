"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoringTIMESTAMP = void 0;
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
class PostRefactoringTIMESTAMP {
    constructor() {
        this.name = "ADD_ADMIN1710869376487";
    }
    async up(queryRunner) {
        const password = process.env.ADMIN_PASSWORD;
        const phone = process.env.ADMIN_PHONE;
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(password, salt);
        await queryRunner.query(`INSERT INTO "user" ( "phoneNumber", "password", "phoneVerified") VALUES ($1,$2,$3)`, [phone, hashPass, true]);
        await queryRunner.query(`INSERT INTO "user_roles" ("userId","rolesId")
       VALUES ((SELECT "id" AS "userId" FROM "user" WHERE "phoneNumber" = $1) ,
       (SELECT "id" AS "rolesId" FROM "roles" WHERE "role" = $2))
        `, [phone, "ADMIN"]);
    }
    async down(queryRunner) {
        const phone = process.env.ADMIN_PHONE;
        await queryRunner.query(`DELETE FROM "user_roles" WHERE "userId" IN (SELECT "id" FROM "user" WHERE "phoneNumber" = $1)`, [phone]);
        await queryRunner.query(`DELETE FROM "user" WHERE "phoneNumber" = $1 `, [
            phone,
        ]);
    }
}
exports.PostRefactoringTIMESTAMP = PostRefactoringTIMESTAMP;
//# sourceMappingURL=insertAdmin.js.map