import express from "express";
import OrdersController from "./orders-controller.js";

export const adminPurchaseRouter = express.Router({ mergeParams: true });
export const shopPurchaseRouter = express.Router({ mergeParams: true });

const ordersController = new OrdersController();

//  admin router : RENDER
adminPurchaseRouter.get("/create", ordersController.renderCreateOrders);
adminPurchaseRouter.get("/:id/edit", ordersController.renderCreateOrders);
//  admin POST
adminPurchaseRouter.post("/", ordersController.createOrders);
// DETAILS & UPDATE & DELETE ADMIN
adminPurchaseRouter
  .route("/")
  .get(ordersController.renderOrders)
  .patch(ordersController.updateOrders)
  .delete(ordersController.deleteOrders);

// shop-app router
// CART API
shopPurchaseRouter.get("/cart", ordersController.renderCartItems);
// PURCHASE FORM
shopPurchaseRouter
  .route("/orders")
  .get(ordersController.renderCreateOrders)
  .post(ordersController.createOrders);

shopPurchaseRouter.get(
  "/purchase/:id",
  ordersController.renderOrdersDetails
);
