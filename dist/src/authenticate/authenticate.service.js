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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_dto_1 = require("./dto/user.dto");
const roles_repository_1 = require("./repositoryes/roles.repository");
const user_repository_1 = require("./repositoryes/user.repository");
const roles_types_1 = require("./types/roles.types");
const user_entity_1 = require("./entity/user.entity");
let AuthenticateService = class AuthenticateService {
    constructor(userRepository, jwtService, rolesRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.rolesRepository = rolesRepository;
    }
    async signUp(creteUserDto) {
        try {
            const role = await this.rolesRepository.find({
                where: { role: roles_types_1.Role.USER, isDeleted: false },
            });
            return await this.userRepository.createUser(creteUserDto, role[0]);
        }
        catch (error) {
            if (error.code === "23505")
                throw new common_1.ConflictException("phone it is used");
            else
                throw new common_1.InternalServerErrorException();
        }
    }
    async signIn(authCredentialsDto, response) {
        const { phone, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({
            where: { phoneNumber: phone, isDeleted: false, phoneVerified: true },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException("Please check credentials");
        }
        const salt = await bcrypt.genSalt();
        const refreshToken = crypto.randomBytes(24).toString("hex");
        user.refreshToken = await bcrypt.hash(refreshToken, salt);
        this.userRepository.save(user);
        const roles = user.roles
            .filter((role) => !role.isDeleted)
            .map((element) => element.role);
        const payload = { encryptedUID: user.id, roles };
        const accessToken = await this.jwtService.sign(payload);
        response.setCookie("token", JSON.stringify({ accessToken, refreshToken }));
        return { accessToken, refreshToken };
    }
    async confirmPhoneNumber(confirmObj) {
        const { phone, code } = confirmObj;
        const user = await this.userRepository.findOne({
            where: {
                phoneNumber: phone,
                isDeleted: false,
                phoneVerificationCode: code,
            },
        });
        if (!user)
            return { phone, confirmation: false };
        user.phoneVerified = true;
        user.phoneVerificationCode = null;
        this.userRepository.save(user);
        return { phone, confirmation: true };
    }
    async deleteAccount(userCredentials, response, user) {
        const { phone, password } = userCredentials;
        if (!user ||
            !(await bcrypt.compare(password, user.password)) ||
            phone !== user.phoneNumber) {
            throw new common_1.UnauthorizedException("Please check credentials");
        }
        user.phoneNumber = null;
        user.email = null;
        user.isDeleted = true;
        user.refreshToken = null;
        this.userRepository.save(user);
        response.setCookie("token", "", { expires: new Date(0) });
        response.status(200).send({ message: "Account deleted" });
    }
};
exports.AuthenticateService = AuthenticateService;
__decorate([
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticateService.prototype, "signIn", null);
__decorate([
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthenticateService.prototype, "deleteAccount", null);
exports.AuthenticateService = AuthenticateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        roles_repository_1.RolesRepository])
], AuthenticateService);
//# sourceMappingURL=authenticate.service.js.map