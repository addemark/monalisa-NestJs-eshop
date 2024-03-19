"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entity/user.entity");
const crypto = require("crypto");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createUser(authCredentialsDto, role) {
        const { phone, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(password, salt);
        const phoneVerificationCode = crypto
            .randomBytes(48)
            .toString("hex")
            .slice(0, 6);
        const roles = [role];
        const user = this.create({
            phoneNumber: phone,
            password: hashPass,
            roles: roles,
            phoneVerificationCode,
        });
        await this.save(user);
        return {
            encryptedUID: user.id,
            role: user.roles,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
        };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map