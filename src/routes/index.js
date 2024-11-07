import { Router } from "express";
import authRouter from "./auth.js";
import {
  allowCORSMiddleware,
  loggingMiddleware,
} from "../utils/middlewares.js";

const router = Router();

router.use(
  "/api/auth",
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
  authRouter,
);

export default router;
