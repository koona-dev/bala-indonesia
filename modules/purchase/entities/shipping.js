// users.js
import { EntitySchema } from "typeorm";
import ShippingStatus from "../consts/shipping-status";

const Shipping = new EntitySchema({
  name: "Shipping", // Nama entity
  tableName: "shippings", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    originId: {
      name: "origin_id",
      type: "int",
    },
    destinationId: {
      name: "destination_id",
      type: "int",
    },
    weight: {
      type: "int",
    },
    courierCode: {
      name: "courier_code",
      type: "varchar",
    },
    courierName: {
      name: "courier_name",
      type: "varchar",
    },
    service: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    cost: {
      type: "int",
    },
    etd: {
      type: "varchar",
    },
    status: {
      type: "enum",
      enum: Object.values(ShippingStatus),
      default: ShippingStatus.PENDING,
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
    },
  },
  relations: {
    orders: {
      type: "one-to-one",
      target: "Order",
      inverseSide: "shipping",
    },
  },
});

export default Shipping;
