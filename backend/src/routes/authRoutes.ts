import express from "express";
import { authMe, login } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/me", authMe);

export default authRouter;
