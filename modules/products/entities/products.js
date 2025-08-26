// users.js
import { EntitySchema } from "typeorm";

const Product = new EntitySchema({
  name: "Product", // Nama entity
  tableName: "products", // Nama tabel di database
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
    category: {
      type: "varchar",
      length: 100,
    },
    stock: {
      type: "bigint",
    },
    price: {
      type: "numeric",
      precision: 10,
      scale: 2,
    },
    description: {
      type: "text",
    },
    rating: {
      type: "numeric",
      precision: 3,
      scale: 2,
      default: 0,
    },
    discount: {
      type: "numeric",
      precision: 5,
      scale: 2,
      nullable: true,
    },
    imageSrc: {
      type: "text",
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
    // soft delete, otomatis terisi ketika pakai repository.softRemove()
    deletedAt: {
      type: "timestamp",
      deleteDate: true,
      nullable: true,
    },
  },
  relations: {
    cartItems: {
      type: "one-to-many",
      target: "CartItems",
      inverseSide: "product",
    },
  },
});

export default Product;
