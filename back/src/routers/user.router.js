import { Router } from "express";
import {
  deleteController,
  listController,
  insertUserController,
  updateController,
} from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const routerUser = Router();

routerUser.get("/", authMiddleware, listController);
routerUser.post("/register", insertUserController);
routerUser.patch("/update/:_id", authMiddleware, updateController);
routerUser.delete("/delete/:_id", validId, validUser, authMiddleware, deleteController);

export default routerUser;
