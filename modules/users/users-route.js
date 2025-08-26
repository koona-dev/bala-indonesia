import { Router } from "express";

import UsersController from "./users-controller.js";

export const adminUserRouter = Router({ mergeParams: true });

const usersController = new UsersController();

//  admin router : RENDER
adminUserRouter.get("/", usersController.renderUsers);
adminUserRouter.get("/create", usersController.renderCreateUser);
adminUserRouter.get("/:id/edit", usersController.renderCreateUser);
// CREATE & GET ADMIN
adminUserRouter.post("/", usersController.createUser);
// DETAILS & UPDATE & DELETE ADMIN
adminUserRouter
  .route("/:id")
  .get(usersController.renderUsers)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
