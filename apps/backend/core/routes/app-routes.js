import { usersRouter, addressRouter } from "../../modules/users/users-route.js";
import { productsRouter } from "../../modules/products/products-route.js";
import { purchaseRouter } from "../../modules/purchase/purchase-route.js";

function appRoutes(app) {
  app.use("/users", usersRouter);
  app.use("/address", addressRouter);
  app.use("/products", productsRouter);
  app.use("/purchases", purchaseRouter);
}

export default appRoutes;
