import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

export const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 12);
};

export const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
