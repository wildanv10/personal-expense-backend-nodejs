import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import categoryRouter from "./category.js";
import subCategoryRouter from "./subCategory.js";
import transactionRouter from "./transaction.js";
import { loggingMiddleware } from "../middlewares/logging.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";

const router = Router();

// /api/auth
router.use(
  "/api/auth",
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
  authRouter,
);

// /api/user
router.use("/api/user", userRouter);
router.use("/api/user", categoryRouter);
router.use("/api/user", subCategoryRouter);

// /api/transaction
router.use("/api/transactions", transactionRouter);

export default router;
