import { Router } from "express";

import ProductsController from "./products-controller.js";

export const adminProductRouter = Router({ mergeParams: true });
export const shopProductRouter = Router({ mergeParams: true });

const productsController = new ProductsController();

//  admin router : RENDER
adminProductRouter.get("/", productsController.renderCreateProduct);
// CREATE & GET ADMIN
adminProductRouter
  .route("/")
  .get(productsController.getProducts)
  .post(productsController.createProduct);
// DETAILS & UPDATE & DELETE ADMIN
adminProductRouter
  .route("/:id")
  .get(productsController.findOneProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

// shop-app router
// INPUT USER
shopProductRouter
  .get("/", productsController.getProducts)  
