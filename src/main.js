import express from "express";
import dotenv from "dotenv";

import { AppDataSource } from "./core/common/database/config/db-config.js";
import seeder from "./core/common/database/seeder.js";
import appRoutes from "./core/common/routes/app-routes.js";

const app = express();
dotenv.config();

// Parse request to body-parser
app.use(express.json());
app.use(express.urlencoded());

// views engine
app.set("view engine", "ejs");
app.set("views", "./ui/views");

// Import routes
appRoutes(app);

// PASSES STATUS CODE AND ERROR MESSAGE TO DEFAULT ERROR PAGE (./partials/errorPage.ejs)
// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message)
//     err.message =
//       "Something Went Wrong! Try again or contact your system admin"; // IF NO ERROR MESSAGE IS GENERATED THEN USE DEFAULT ERROR MESSAGE
//   res.status(statusCode).render("errorPage", { err });
// });

// Initialize database connection and start the server
AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });

seeder();
