import * as postgresDriver from "pg";
import { DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export function getConfig() {
  return {
    driver: postgresDriver,
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    migrations: [__dirname + "/migrations/**/*.{ts,js}"],
    entities: [__dirname + "/../src/**/entity/*.{ts,js}"],
    migrationsTableName: "custom_migrations",
    ssl: {
      rejectUnauthorized: false,
    },
  } as DataSourceOptions;
}
