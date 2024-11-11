import express from "express";
import { TransactionSchema } from "../mongoose/schemas/transaction.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";
import { checkSession } from "../middlewares/checkSession.js";
import { loggingMiddleware } from "../middlewares/logging.js";

const transactionRouter = express.Router();

// middleware
transactionRouter.use(
  checkSession,
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
);

// routes
// Create Transaction
transactionRouter.post("/", async (req, res) => {
  try {
    const {
      type,
      date,
      description,
      amount,
      category,
      sub_category,
      payment_method,
      notes,
    } = req.body;

    const newTransaction = new TransactionSchema({
      user_id: req.user._id,
      type,
      date,
      description,
      amount,
      category,
      sub_category,
      payment_method,
      notes,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All Transactions (for the logged-in user using session)
transactionRouter.get("/", async (req, res) => {
  try {
    const transactions = await TransactionSchema.find({
      user_id: req.user._id,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a Single Transaction by ID
transactionRouter.get("/:id", async (req, res) => {
  try {
    const transaction = await TransactionSchema.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Transaction by ID
transactionRouter.put("/:id", async (req, res) => {
  try {
    const {
      type,
      date,
      description,
      amount,
      category,
      sub_category,
      payment_method,
      notes,
    } = req.body;
    const updatedTransaction = await TransactionSchema.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      {
        type,
        date,
        description,
        amount,
        category,
        sub_category,
        payment_method,
        notes,
      },
      { new: true },
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Transaction by ID
transactionRouter.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await TransactionSchema.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default transactionRouter;
