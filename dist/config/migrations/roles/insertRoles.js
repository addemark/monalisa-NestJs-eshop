"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoringTIMESTAMP = void 0;
class PostRefactoringTIMESTAMP {
    constructor() {
        this.name = "ADD_ROLES1710865673389";
    }
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO roles (role)
       VALUES ('ADMIN'),('USER'),('CURATOR'),('CREATOR') `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM roles WHERE role IN ('ADMIN','USER','CURATOR','CREATOR')`);
    }
}
exports.PostRefactoringTIMESTAMP = PostRefactoringTIMESTAMP;
//# sourceMappingURL=insertRoles.js.map