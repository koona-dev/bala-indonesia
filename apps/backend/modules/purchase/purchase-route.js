import express from "express";
import CartController from "./controllers/cart-controller.js";
import OrdersController from "./controllers/orders-controller.js";

export const purchaseRouter = express.Router({ mergeParams: true });
const cartController = new CartController();
const ordersController = new OrdersController();

// cart router
purchaseRouter.get("/carts", cartController.getCarts);
purchaseRouter.post("/cart/create", cartController.createCart);
purchaseRouter.post("/cart/add-item", cartController.addCartItems);
purchaseRouter
  .route("/cart/:cartId")
  .get(cartController.findOneCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

// order router
purchaseRouter.get("/orders", ordersController.getOrders);
purchaseRouter.post("/select-courier", ordersController.calculateShippingCost);
purchaseRouter.post("/shipping", ordersController.createShipping);
purchaseRouter.post("/payment", ordersController.createPayment);
purchaseRouter.post("/orders", ordersController.createOrder);
purchaseRouter
  .route("/order/:orderId")
  .get(ordersController.findOneOrder)
  .patch(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);
