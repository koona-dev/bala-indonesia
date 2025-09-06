import { Router } from "express";
import UsersController from "./controllers/users-controller.js";
import AddressController from "./controllers/address-controller.js";

export const usersRouter = Router({ mergeParams: true });
export const addressRouter = Router({ mergeParams: true });
const usersController = new UsersController();
const addressController = new AddressController();

// address router
addressRouter.get("/province", addressController.getProvince);
addressRouter.get("/city/:provinceId", addressController.getCity);
addressRouter.get("/district/:cityId", addressController.getDistrict);
addressRouter.get("/sub-district/:districtId", addressController.getSubDistrict);

addressRouter.get("/", addressController.getAddress);
addressRouter.post("/", addressController.createAddress);
addressRouter
  .route("/:addressId")
  .get(addressController.findOneAddress)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

// user router
usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.createUser);
usersRouter
  .route("/:userId")
  .get(usersController.findOneUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
