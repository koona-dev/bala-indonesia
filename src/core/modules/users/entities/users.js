// users.js
import { EntitySchema } from "typeorm";

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
      type: "text",
      default: "CUSTOMER", // Default role
    },
    address: {
      type: "varchar",
      length: 255,
    },
  },
});

export default User;
