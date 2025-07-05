import { Router } from "express";

import UsersController from "./users-controller.js";

export const adminUserRouter = Router({ mergeParams: true });
export const shopUserRouter = Router({ mergeParams: true });

const usersController = new UsersController();

//  admin router : RENDER
adminUserRouter.get("/", usersController.renderCreateUser);
// CREATE & GET ADMIN
adminUserRouter
  .route("/")
  .get(usersController.getUsers)
  .post(usersController.createUser);
// DETAILS & UPDATE & DELETE ADMIN
adminUserRouter
  .route("/:id")
  .get(usersController.findOneUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

// shop-app router
// INPUT USER
shopUserRouter
  .get("/:email", usersController.findOneUser)
  .post("/", usersController.createUser);
