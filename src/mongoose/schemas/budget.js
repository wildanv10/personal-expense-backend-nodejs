import mongoose from "mongoose";

const budgetDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  sub_categories: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const budgetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  period_month: {
    type: Number,
    required: true,
  },
  period_year: {
    type: Number,
    required: true,
  },
  budget_details: [budgetDetailsSchema],
});

export const BudgetSchema = mongoose.model("Budget", budgetSchema);
