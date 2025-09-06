import express from "express";
import ProductsController from "./products-controller.js";

export const productsRouter = express.Router({ mergeParams: true });
const productsController = new ProductsController();

productsRouter.get("/", productsController.getProducts);
productsRouter.post("/", productsController.createProduct);
productsRouter
  .route("/:productId")
  .get(productsController.findOneProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);