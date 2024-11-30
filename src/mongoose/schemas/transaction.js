import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      // TODO: create CRUD function for Payment Method that embedding in User document
      enum: [
        "Cash",
        "BCA - Virtual Account",
        "BCA - QRIS",
        "BCA - Transfer",
        "BCA BLU - Virtual Account",
        "BCA BLU - QRIS",
        "BCA BLU - Transfer",
        "UOB - QRIS",
        "UOB - Transfer",
        "ShopeePay",
        "GoPay",
      ],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const TransactionSchema = mongoose.model(
  "Transaction",
  transactionSchema,
);
