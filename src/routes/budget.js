import express from "express";
import { BudgetSchema } from "../mongoose/schemas/budget.js";
import { checkSession } from "../middlewares/checkSession.js";
import { loggingMiddleware } from "../middlewares/logging.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";

const router = express.Router();

router.use(
  checkSession,
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
);

router.post("/budget", async (req, res) => {
  try {
    const { period_month, period_year, budget_details } = req.body;
    const newBudget = new BudgetSchema({
      user_id: req.user._id,
      period_month,
      period_year,
      budget_details,
    });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const budgetRouter = router;
export default budgetRouter;
