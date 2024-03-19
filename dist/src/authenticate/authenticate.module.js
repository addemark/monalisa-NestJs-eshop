"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateModule = void 0;
const common_1 = require("@nestjs/common");
const authenticate_controller_1 = require("./authenticate.controller");
const authenticate_service_1 = require("./authenticate.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const user_repository_1 = require("./repositoryes/user.repository");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const roles_entity_1 = require("./entity/roles.entity");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const roles_controller_1 = require("./roles.controller");
const roles_repository_1 = require("./repositoryes/roles.repository");
const roles_service_1 = require("./roles.service");
const has_role_guard_1 = require("./guards/has-role.guard");
const config_1 = require("@nestjs/config");
let AuthenticateModule = class AuthenticateModule {
};
exports.AuthenticateModule = AuthenticateModule;
exports.AuthenticateModule = AuthenticateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, roles_entity_1.Roles]),
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: 3600,
                },
            }),
        ],
        controllers: [authenticate_controller_1.AuthenticateController, roles_controller_1.RolesController],
        providers: [
            authenticate_service_1.AuthenticateService,
            roles_service_1.RolesService,
            user_repository_1.UserRepository,
            roles_repository_1.RolesRepository,
            jwt_strategy_1.JwtStrategy,
            has_role_guard_1.UserHasRoleGuard,
        ],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthenticateModule);
//# sourceMappingURL=authenticate.module.js.map