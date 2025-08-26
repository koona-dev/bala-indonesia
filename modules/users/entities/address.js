// address.js
import { EntitySchema } from "typeorm";

const Address = new EntitySchema({
  name: "Address", // Nama entity
  tableName: "address", // Nama tabel di database
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    provinceId: {
      name: "province_id",
      type: "int",
    },
    province: {
      type: "varchar",
    },
    cityId: {
      name: "city_id",
      type: "int",
    },
    city: {
      type: "varchar",
    },
    districtId: {
      name: "district_id",
      type: "int",
    },
    district: {
      type: "varchar",
    },
    subDistrictId: {
      name: "sub_district_id",
      type: "int",
    },
    subDistrict: {
      name: "sub_district",
      type: "varchar",
    },
    zipCode: {
      name: "zip_code",
      type: "varchar",
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
  },
});

export default Address;
