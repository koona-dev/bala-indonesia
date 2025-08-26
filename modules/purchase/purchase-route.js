import express from "express";
import OrdersController from "./orders-controller.js";
import CartController from "./cart-controller.js";

export const adminPurchaseRouter = express.Router({ mergeParams: true });
export const shopPurchaseRouter = express.Router({ mergeParams: true });

const ordersController = new OrdersController();
const cartController = new CartController();

//  admin router : RENDER
adminPurchaseRouter.get("/create", ordersController.renderCreateOrders);
adminPurchaseRouter.get("/:orderId/edit", ordersController.renderCreateOrders);
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
shopPurchaseRouter.get("/cart", cartController.renderCartItems);
// PURCHASE FORM
shopPurchaseRouter
  .route("/orders")
  .get(ordersController.renderCreateOrders)
  .post(ordersController.createOrders);

shopPurchaseRouter.get(
  "/my-orders",
  ordersController.renderOrders
);
shopPurchaseRouter.get(
  "/my-orders/:orderId",
  ordersController.renderOrdersDetails
);
