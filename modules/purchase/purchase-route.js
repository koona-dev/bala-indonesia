import express from "express";
import PurchaseController from "./purchase-controller.js";

export const adminPurchaseRouter = express.Router({ mergeParams: true });
export const shopPurchaseRouter = express.Router({ mergeParams: true });

const purchaseController = new PurchaseController();

//  admin router : RENDER
adminPurchaseRouter.get("/create", purchaseController.renderCreatePurchase);
adminPurchaseRouter.get("/:id/edit", purchaseController.renderCreatePurchase);
//  admin POST
adminPurchaseRouter.post("/", purchaseController.createPurchase);
// DETAILS & UPDATE & DELETE ADMIN
adminPurchaseRouter
  .route("/")
  .get(purchaseController.renderPurchase)
  .patch(purchaseController.updatePurchase)
  .delete(purchaseController.deletePurchase);

// shop-app router
// CART API
shopPurchaseRouter.get("/cart", purchaseController.renderCartItems);
// PURCHASE FORM
shopPurchaseRouter
  .route("/purchase")
  .get(purchaseController.renderCreatePurchase)
  .post(purchaseController.createPurchase);

shopPurchaseRouter.get(
  "/purchase/:id",
  purchaseController.renderPurchaseDetails
);
