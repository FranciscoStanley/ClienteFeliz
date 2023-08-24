import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { loginRepository } from "../repositories/auth.repository.js";

export const generateTokenService = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_JWT, { expiresIn: "5h" });
};

export const loginService = async (username, password) => {
  const user = await loginRepository(username);

  if (!user) {
    throw new Error("Wrong password or username");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = generateTokenService(user._id);

  return { token };
};
