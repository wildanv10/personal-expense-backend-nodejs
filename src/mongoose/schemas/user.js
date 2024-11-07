import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: String,
  sub_category_for: String,
});

const categorySchema = new mongoose.Schema({
  name: String,
  category_for: String,
  sub_categories: [subCategorySchema],
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  categories: [categorySchema],
});

export const UserSchema = mongoose.model("User", userSchema);
