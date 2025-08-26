// users.js
import { EntitySchema } from "typeorm";
import UserRole from "../consts/user-role.js";

const User = new EntitySchema({
  name: "User", // Nama entity
  tableName: "users", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 100,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "text",
      nullable: true,
    },
    phone: {
      type: "text",
    },
    role: {
      type: "enum",
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER, // Default role
    },
    address: {
      type: "varchar",
      length: 255,
    },
  },
  relations: {
    carts: {
      type: "one-to-one",
      target: "Cart",
      inverseSide: "user",
    },    
    orders: {
      type: "one-to-many",
      target: "Order",
      inverseSide: "user",
    },
  },
});

export default User;
