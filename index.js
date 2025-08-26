import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { AppDataSource } from "./common/database/config/db-config.js";
import seeder from "./common/database/seeder.js";
import appRoutes from "./common/routes/app-routes.js";

const app = express();
dotenv.config();

// Parse request to body-parser
app.use(express.json());
app.use(express.urlencoded());

// views engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set public folder
app.use(express.static(path.join(__dirname, "public")));

// Import routes
appRoutes(app);

// // PASSES STATUS CODE AND ERROR MESSAGE TO DEFAULT ERROR PAGE (./partials/errorPage.ejs)
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
      seeder();
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });

