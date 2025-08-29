// users.js
import { EntitySchema } from "typeorm";
import CartStatus from "../consts/cart-status.js";

export const Cart = new EntitySchema({
  name: "Cart", // Nama entity
  tableName: "carts", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    status: {
      type: "enum",
      enum: Object.values(CartStatus),
      default: CartStatus.DRAFT,
    },
    // otomatis isi ketika record pertama kali dibuat
    createdAt: {
      type: "timestamp",
      createDate: true, // otomatis set ketika INSERT
    },
    // otomatis update ketika record diubah
    updatedAt: {
      type: "timestamp",
      updateDate: true, // otomatis set ketika UPDATE
    },
  },
  relations: {
    user: {
      type: "one-to-one",
      target: "User",
      joinColumn: {
        name: "user_id", // custom nama kolom FK
        referencedColumnName: "id", // kolom yang direferensi dari target
      },
      cascade: true,
      onDelete: "CASCADE",
    },
    orders: {
      type: "one-to-many",
      target: "Order",
      inverseSide: "carts",
    },
    cartItems: {
      type: "one-to-many",
      target: "CartItems",
      inverseSide: "carts",
    },
  },
});

export const CartItems = new EntitySchema({
  name: "CartItems", // Nama entity
  tableName: "cart_items", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    quantity: { type: "int" },
    price: { type: "int" },
    // otomatis isi ketika record pertama kali dibuat
    createdAt: {
      type: "timestamp",
      createDate: true, // otomatis set ketika INSERT
    },
    // otomatis update ketika record diubah
    updatedAt: {
      type: "timestamp",
      updateDate: true, // otomatis set ketika UPDATE
    },
    // soft delete, otomatis terisi ketika pakai repository.softRemove()
    deletedAt: {
      type: "timestamp",
      deleteDate: true,
      nullable: true,
    },
  },
  relations: {
    carts: {
      type: "many-to-one",
      target: "Cart",
      joinColumn: {
        name: "cart_id", // custom nama kolom FK
        referencedColumnName: "id", // kolom yang direferensi dari target
      },
      cascade: true,
      onDelete: "CASCADE",
    },
    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: {
        name: "product_id", // custom nama kolom FK
        referencedColumnName: "id", // kolom yang direferensi dari target
      },
      cascade: true,
      onDelete: "CASCADE",
    },
  },
});
