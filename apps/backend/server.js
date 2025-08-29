import express from "express";
import dotenv from "dotenv";

import { AppDataSource } from "./core/database/config/db-config.js";
import seeder from "./core/database/seeder.js";
import appRoutes from "./core/routes/app-routes.js";

const app = express();
dotenv.config();

// Parse request to body-parser
app.use(express.json());

// Import routes
appRoutes(app);

const PORT = process.env.PORT || 8080;
// Initialize database connection and start the server
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server API http://localhost:${PORT}`);
      seeder();
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
