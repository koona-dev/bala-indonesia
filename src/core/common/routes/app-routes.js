import {
  adminProductRouter,
  shopProductRouter,
} from "../../modules/products/products-route.js";
import {
  adminPurchaseRouter,
  shopPurchaseRouter,
} from "../../modules/purchase/purchase-route.js";
import { adminUserRouter } from "../../modules/users/users-route.js";

function appRoutes(app) {
  // admin routes
  app.use("/admin/users", adminUserRouter);
  app.use("/admin/products", adminProductRouter);
  app.use("/admin/purchase", adminPurchaseRouter);

  // shop routes
  app.use(shopProductRouter);
  app.use(shopPurchaseRouter);
}

export default appRoutes;
