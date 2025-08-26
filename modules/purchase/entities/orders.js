// users.js
import { EntitySchema } from "typeorm";
import OrdersStatus from "../consts/orders-status.js";

const Orders = new EntitySchema({
  name: "Order", // Nama entity
  tableName: "orders", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    voucher: {
      type: "varchar",
      nullable: true,
    },
    discount: {
      type: "numeric",
      nullable: true,
    },
    totalPrice: {
      name: "total_price",
      type: "int",
    },
    status: {
      type: "enum",
      enum: Object.values(OrdersStatus),
      default: OrdersStatus.PENDING,
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
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id", // custom nama kolom FK
        referencedColumnName: "id", // kolom yang direferensi dari target
      },
      cascade: true,
      onDelete: "CASCADE",
    },
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
    shipping: {
      type: "one-to-one",
      target: "Shipping",
      joinColumn: {
        name: "shipping_id", // custom nama kolom FK
        referencedColumnName: "id", // kolom yang direferensi dari target
      },
      cascade: true,
      onDelete: "CASCADE",
    },
  },
});

export default Orders;
