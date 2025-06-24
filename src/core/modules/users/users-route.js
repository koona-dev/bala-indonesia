import { Router } from "express";

import UsersController from "./users-controller.js";

export const adminUserRouter = Router();
export const salesUserRouter = Router();

const usersController = new UsersController();

adminUserRouter.get("/", usersController.getUsers);
salesUserRouter.get("/:email", usersController.getUserByEmail);
adminUserRouter.post("/", usersController.createUser);
adminUserRouter.post("/update/:id", usersController.updateUser);
adminUserRouter.post("/delete/:id", usersController.deleteUser);
