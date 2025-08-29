import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const styleShared = path.resolve(__dirname, "styles");
export const scriptShared = path.resolve(__dirname, "scripts");
export const componentShared = path.resolve(__dirname, "components");
