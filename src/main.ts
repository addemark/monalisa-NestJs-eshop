import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import multipart from "fastify-multipart";
import fastifyCookie from "@fastify/cookie";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { TransformInterceptor } from "src/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.register(multipart);
  app.useGlobalPipes(new ValidationPipe());
  await app.register(fastifyCookie, {
    secret: "", // for cookies signature
  });
  await app.listen(3010);
}
bootstrap();
