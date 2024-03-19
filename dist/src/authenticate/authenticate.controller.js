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
exports.AuthenticateController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const authenticate_service_1 = require("./authenticate.service");
const get_user_decorator_1 = require("./decorator/get-user.decorator");
const roles_decorator_1 = require("./decorator/roles.decorator");
const user_dto_1 = require("./dto/user.dto");
const user_entity_1 = require("./entity/user.entity");
const has_role_guard_1 = require("./guards/has-role.guard");
const roles_types_1 = require("./types/roles.types");
let AuthenticateController = class AuthenticateController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signupCredentials) {
        return this.authService.signUp(signupCredentials);
    }
    phoneConfirm(confirmObj) {
        return this.authService.confirmPhoneNumber(confirmObj);
    }
    signIn(signupCredentials, response) {
        return this.authService.signIn(signupCredentials, response);
    }
    deleteAccount(userCredentials, response, user) {
        return this.authService.deleteAccount(userCredentials, response, user);
    }
    test(req, user) {
        console.log("[***tet**]", user);
        return "test";
    }
};
exports.AuthenticateController = AuthenticateController;
__decorate([
    (0, common_1.Post)("/signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("/phone-confirm"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.PhoneConfirmationDto]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "phoneConfirm", null);
__decorate([
    (0, common_1.Post)("/signin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("/delete-account"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthenticateController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)("/guard"),
    (0, roles_decorator_1.Roles)(roles_types_1.Role.ADMIN, roles_types_1.Role.USER),
    (0, common_1.UseGuards)(has_role_guard_1.UserHasRoleGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthenticateController.prototype, "test", null);
exports.AuthenticateController = AuthenticateController = __decorate([
    (0, common_1.Controller)("authenticate"),
    __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService])
], AuthenticateController);
//# sourceMappingURL=authenticate.controller.js.map