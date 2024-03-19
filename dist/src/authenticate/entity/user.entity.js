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
exports.User = void 0;
const roles_entity_1 = require("./roles.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({
        nullable: true,
        default: 1,
    }),
    __metadata("design:type", Number)
], User.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: false,
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "emailVerificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "phoneVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneVerificationCode", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => roles_entity_1.Roles, (role) => role.users, { eager: true }),
    (0, typeorm_1.JoinTable)({ name: "user_roles" }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map