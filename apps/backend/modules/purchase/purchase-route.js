import express from "express";
import CartController from "./controllers/cart-controller.js";
import OrdersController from "./controllers/orders-controller.js";

export const purchaseRouter = express.Router({ mergeParams: true });
const cartController = new CartController();
const ordersController = new OrdersController();

// cart router
purchaseRouter.get("/carts", cartController.getCarts);
purchaseRouter.post("/add-cart", cartController.addCart);
purchaseRouter
  .route("/cart/:cartId")
  .get(cartController.findOneCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

// order router
purchaseRouter.get("/orders", ordersController.getOrders);
purchaseRouter.patch("/address/:addressId", ordersController.updateAddress);
purchaseRouter.post("/select-courier", ordersController.selectShipping);
purchaseRouter.post("/shipping", ordersController.createShipping);
purchaseRouter.post("/payment", ordersController.createPayment);
purchaseRouter.post("/orders", ordersController.createOrder);
purchaseRouter
  .route("/orders/:orderId")
  .get(ordersController.findOneOrder)
  .patch(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);