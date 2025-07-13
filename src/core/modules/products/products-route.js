import express from "express";

import ProductsController from "./products-controller.js";

export const adminProductRouter = express.Router({ mergeParams: true });
export const shopProductRouter = express.Router({ mergeParams: true });

const productsController = new ProductsController();

//  admin router : RENDER
adminProductRouter.get("/", productsController.renderAdminProducts);
adminProductRouter.get("/create", productsController.renderCreateProduct);
adminProductRouter.get("/:id/edit", productsController.renderCreateProduct);
//  admin POST
adminProductRouter.post("/", productsController.createProduct);
// DETAILS & UPDATE & DELETE ADMIN
adminProductRouter
  .route("/:id")
  .get(productsController.renderProductDetails)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

// shop-app router
// INPUT USER
shopProductRouter.get("/", productsController.renderSalesProducts);
shopProductRouter.get("/:name", productsController.renderProductDetails);
