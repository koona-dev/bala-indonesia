import express from "express";
import dotenv from "dotenv";

import AppDataSource from "./core/common/database/config/db-config.js";
import seeder from "./core/common/database/seeder.js";
import appRoutes from "./core/common/routes/app-routes.js";

const app = express();
dotenv.config({ path: "./.env.dev" });

// Parse request to body-parser
app.use(express.urlencoded());
app.use(express.json());

// Import routes
app.get("/test", (req, res) => {
  res.send("Hello World!");
});
app.get("*", (req, res) => {
  res.status(505).json({ message: "Bad Request" });
});

appRoutes(app);

// Initialize database connection and start the server
AppDataSource.initialize()
  .then(async () => {
    seeder();

    app.listen(port, () => {
      console.log(`Example app listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
