import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

// lokasi view untuk admin
const salesViews = path.join(__dirname, "ui");
// lokasi view shared
const sharedViews = path.join(__dirname, "/../../packages/shared/ui");

app.set("view engine", "ejs");
app.set("views", [salesViews, sharedViews]); // <- multiple paths
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/../../packages/shared/public")));
app.use(express.urlencoded({ extended: true }));

// inject API URL to all views
app.locals.API_DEV_URL = process.env.API_DEV_URL || "http://localhost:8000";

app.get("/", (_, res) => res.redirect("/dashboard"));
app.get("/dashboard", (req, res) =>
  res.render("dashboard", { title: "Admin Dashboard" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Admin panel http://localhost:${PORT}`));
