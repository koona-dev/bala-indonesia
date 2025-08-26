// users.js
import { EntitySchema } from "typeorm";

const Cart = new EntitySchema({
  name: "Cart", // Nama entity
  tableName: "carts", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    quantity: { type: "int" },
    price: { type: "int" },
  },
  relations: {
    purchase: {
      type: "many-to-one",
      target: "Cart",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: true,
      eager: true,
    },
  },
});

export default Cart;
