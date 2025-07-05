import { adminProductRouter, shopProductRouter } from "../../modules/products/products-route.js";
import {
  adminUserRouter,
  shopUserRouter,
} from "../../modules/users/users-route.js";

function appRoutes(app) {
  // admin routes
  app.use("/admin/users", adminUserRouter);
  app.use("/admin/products", adminProductRouter);
  
  // shop routes
  app.use("/orders/account", shopUserRouter);
  app.use(shopProductRouter);
}

export default appRoutes;
