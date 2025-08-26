import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import User from "../../../modules/users/entities/users.js";
import Product from "../../../modules/products/entities/products.js";
import {Cart, CartItems} from "../../../modules/purchase/entities/cart.js";
import Orders from "../../../modules/purchase/entities/orders.js";

dotenv.config();
const env = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Product, Cart, CartItems, Orders],
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrations: [path.join(__dirname, "../migrations/*.js")],
});
