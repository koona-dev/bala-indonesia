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

// Import routes
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

appRoutes(app);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

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
