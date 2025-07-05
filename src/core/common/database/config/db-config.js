import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import User from "../../../modules/users/entities/users.js";

dotenv.config();
const env = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ["src/core/common/database/migrations/*.js"],
});


