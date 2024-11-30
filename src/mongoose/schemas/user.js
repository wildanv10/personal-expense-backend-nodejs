import mongoose from "mongoose";

// TODO: remove unused Category and SubCategory functions

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  payment_methods: [String],
});

export const UserSchema = mongoose.model("User", userSchema);
