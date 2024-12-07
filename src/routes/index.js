import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import categoryRouter from "./category.js";
// import subCategoryRouter from "./subCategory.js";
import transactionRouter from "./transaction.js";
import { loggingMiddleware } from "../middlewares/logging.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";
import budgetRouter from "./budget.js";

const router = Router();

// welcome page
router.get("/", (req, res) => {
  res.status(200).send("Welcome!");
});

// /api/auth
router.use(
  "/api/auth",
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
  authRouter,
);

// /api/user
router.use("/api/user", userRouter);
router.use("/api", categoryRouter);
// router.use("/api", subCategoryRouter);
router.use("/api", budgetRouter);

// /api/transaction
router.use("/api/transactions", transactionRouter);

export default router;
