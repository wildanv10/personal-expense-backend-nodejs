import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: String,
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  icon: String,
  sub_categories: [subCategorySchema],
});

export const CategorySchema = mongoose.model("Category", categorySchema);
