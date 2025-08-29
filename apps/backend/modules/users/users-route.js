import { Router } from "express";
import UsersController from "./users-controller.js";

export const usersRouter = Router({ mergeParams: true });
const usersController = new UsersController();

usersRouter.get("/province", usersController.getProvince);
usersRouter.get("/city/:provinceId", usersController.getCity);
usersRouter.get("/district/:cityId", usersController.getDistrict);
usersRouter.get("/sub-district/:districtId", usersController.getSubDistrict);

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.createUser);
usersRouter
  .route("/:userId")
  .get(usersController.findOneUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);