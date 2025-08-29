import express from "express";
import UsersController from "../controllers/users-controller.js";
import ProductsController from "../controllers/products-controller.js";
import OrdersController from "../controllers/orders-controller.js";

// declare router every modules
export const usersRouter = express.Router({ mergeParams: true });
export const productsRouter = express.Router({ mergeParams: true });
export const ordersRouter = express.Router({ mergeParams: true });

// call controller evert modules
const usersController = new UsersController();
const productsController = new ProductsController();
const ordersController = new OrdersController();

// user router
usersRouter.get("/login", usersController.renderLogin);
usersRouter.get("/daftar", usersController.renderCreateUser);
usersRouter.get("/:name/edit", usersController.renderUpdateUser);

// product router
productsRouter.get("/", productsController.renderProducts);
productsRouter.get("/:productName", productsController.renderProductDetails);

// order router
ordersRouter.get("/cart", ordersController.renderCartItems);
ordersRouter.get("/orders", ordersController.renderCreateOrder);  
ordersRouter.get("/my-orders", ordersController.renderOrders);
ordersRouter.get(
  "/my-orders/:orderId",
  ordersController.renderOrderDetails
);
