// users.js
import { EntitySchema } from "typeorm";
import OrdersStatus from "../consts/orders-status.js";

const Orders = new EntitySchema({
  name: "Orders", // Nama entity
  tableName: "orders", // Nama tabel di database
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
      enum: Object.values(OrdersStatus),
      default: OrdersStatus.PENDING,
    },
  },
  relations: {    
    carts: {
      type: "one-to-many",
      target: "Cart",
      inverseSide: "orders",
      cascade: true,
    },
  },
});

export default Orders;
