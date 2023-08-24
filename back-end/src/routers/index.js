import { Router } from "express";
import routerUser from "./user.router.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use("/user", routerUser);
router.use("/auth", authRouter);

export default router;
