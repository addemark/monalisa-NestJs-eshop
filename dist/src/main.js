"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const fastify_multipart_1 = require("fastify-multipart");
const cookie_1 = require("@fastify/cookie");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const transform_interceptor_1 = require("./transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.register(fastify_multipart_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.register(cookie_1.default, {
        secret: '',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map