import express from "express";
import { BudgetSchema } from "../mongoose/schemas/budget.js";
import { checkSession } from "../middlewares/checkSession.js";
import { loggingMiddleware } from "../middlewares/logging.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";
import { budgetSeeder } from "../seeder/budget.js";

const router = express.Router();

router.use(
  checkSession,
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
);

router.post("/budget/seed", async (req, res) => {
  try {
    // Clear existing categories
    await BudgetSchema.deleteMany({});

    // Insert Category Seeder
    const categories = await BudgetSchema.insertMany(budgetSeeder);

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read budget based on selected period (for the logged-in user using session)
/**
 * @route GET /api/budget/period
 * @description Get budget based on selected period month and year
 * @query month (required) - The month to filter transactions (1-12)
 * @query year (required) - The year to filter transactions
 */
router.get("/budget/period", async (req, res) => {
  const { month, year } = req.query;

  // Validate query parameters
  if (!month || !year) {
    return res.status(400).json({ message: "Month and year are required." });
  }

  const numericMonth = parseInt(month, 10);
  const numericYear = parseInt(year, 10);

  if (
    isNaN(numericMonth) ||
    isNaN(numericYear) ||
    numericMonth < 1 ||
    numericMonth > 12
  ) {
    return res.status(400).json({ message: "Invalid month or year provided." });
  }

  try {
    let budget = await BudgetSchema.findOne({
      user_id: req.user.id,
      period_month: numericMonth,
      period_year: numericYear,
    });

    if (!budget) {
      const budgetTemplate = {
        user_id: req.user.id,
        period_month: numericMonth,
        period_year: numericYear,
        budget_details: budgetSeeder[0].budget_details,
      };

      budget = await BudgetSchema.create(budgetTemplate);
      // res.status(200).json(createdBudget);
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ message: "Server error." });
  }
});

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

// Get all Budget
router.get("/budget", async (req, res) => {
  try {
    const budget = await BudgetSchema.find({
      user_id: req.user._id,
    });
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Budget by ID
router.put("/budget/:budgetId/:budgetDetailId", async (req, res) => {
  try {
    const { budget_details } = req.body;

    const updatedBudget = await BudgetSchema.findOneAndUpdate(
      {
        _id: req.params.budgetId,
        user_id: req.user._id,
        "budget_details._id": req.params.budgetDetailId,
      },
      {
        $set: {
          "budget_details.$[budgetDetail].sub_categories":
            budget_details?.sub_categories,
        },
      },
      {
        arrayFilters: [{ "budgetDetail._id": req.params.budgetDetailId }],
        new: true,
      },
    );
    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    res.json(updatedBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const budgetRouter = router;
export default budgetRouter;
