// users.js
import { EntitySchema } from "typeorm";
import PurchaseStatus from "../consts/purchase-status.js";

const Purchase = new EntitySchema({
  name: "Purchase", // Nama entity
  tableName: "purchases", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    totalPrice: {
      type: "int",
    },
    status: {
      type: "enum",
      enum: Object.values(PurchaseStatus),
      default: PurchaseStatus.PENDING,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true,
    },
    carts: {
      type: "one-to-many",
      target: "Cart",
      inverseSide: "purchase",
      cascade: true,
    },
  },
});

export default Purchase;
