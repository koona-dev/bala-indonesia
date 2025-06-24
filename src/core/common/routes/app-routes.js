import {
  adminUserRouter,
  salesUserRouter,
} from "../../modules/users/users-route.js";

function appRoutes(app) {
  // admin routes
  app.use("/admin", adminUserRouter);

  // user routes
  app.use("/sales", salesUserRouter);
}

export default appRoutes;
