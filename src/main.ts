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
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.register(multipart);
  app.useGlobalPipes(new ValidationPipe());
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET, // for cookies signature
  });
  // this must be enabled when having different domains for
  // front and backend
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });
  await app.listen(3010);
}
bootstrap();
