import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { styleShared, scriptShared, componentShared } from "@bala/shared-ui";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.set("ui", [
  path.join(__dirname, "partials"),
  path.join(__dirname, "components"),
  path.join(__dirname, "pages"),
  path.join(__dirname, componentShared), // shared components
]); // <- multiple paths

app.use(express.static(path.join(__dirname, "public")));
app.use("shared", express.static(styleShared));
app.use("shared/scripts", express.static(scriptShared));

app.use(express.urlencoded({ extended: true }));

// inject API URL to all views
app.locals.API_DEV_URL = process.env.API_DEV_URL || "http://localhost:8000";

app.get("/", (_, res) => res.redirect("/dashboard"));
app.get("/dashboard", (req, res) =>
  res.render("dashboard", { title: "Admin Dashboard" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Admin panel http://localhost:${PORT}`));
