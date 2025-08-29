import express from "express";
import UsersController from "../controllers/users-controller.js";
import ProductsController from "../controllers/products-controller.js";
import PurchasesController from "../controllers/purchases-controller.js";

// declare router every modules
export const usersRouter = express.Router({ mergeParams: true });
export const productsRouter = express.Router({ mergeParams: true });
export const purchasesRouter = express.Router({ mergeParams: true });

// call controllers every modules
const usersController = new UsersController();
const productsController = new ProductsController();
const purchasesController = new PurchasesController();

// user management router
usersRouter.get("/", usersController.renderUsers);
usersRouter.get("/create", usersController.renderCreateUser);
usersRouter.get("/:name/edit", usersController.renderUpdateUser);

// product management router
productsRouter.get("/", productsController.renderProductList);
productsRouter.get("/:productName", productsController.renderProductDetails);
productsRouter.get("/create", productsController.renderCreateProduct);
productsRouter.get(
  "/:productName/edit",
  productsController.renderUpdateProduct
);

// purchase management router
purchasesRouter.get("/", purchasesController.renderPurchaseList);
purchasesRouter.get("/:orderName", purchasesController.renderPurchaseDetails);
purchasesRouter.get("/create", purchasesController.renderCreatePurchase);
purchasesRouter.get(
  "/:purchaseId/edit",
  purchasesController.renderUpdatePurchase
);
