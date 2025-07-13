import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import User from "../../../modules/users/entities/users.js";
import Product from "../../../modules/products/entities/products.js";
import Cart from "../../../modules/purchase/entities/cart.js";
import Purchase from "../../../modules/purchase/entities/purchase.js";

dotenv.config();
const env = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Product, Cart, Purchase],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ["src/core/common/database/migrations/*.js"],
});
