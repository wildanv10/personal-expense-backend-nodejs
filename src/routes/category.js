import express from "express";
import { UserSchema } from "../mongoose/schemas/user.js";
import { checkSession } from "../middlewares/checkSession.js";
import { loggingMiddleware } from "../middlewares/logging.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";
import { CategorySchema } from "../mongoose/schemas/category.js";
import { categorySeeder } from "../seeder/category.js";

const router = express.Router();

// middleware
router.use(
  checkSession,
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
);

// routes
router.post("/category/seed", async (req, res) => {
  try {
    // Clear existing categories
    await CategorySchema.deleteMany({});

    // Insert Category Seeder
    const categories = await CategorySchema.insertMany(categorySeeder);

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/category/type/:categoryType", async (req, res) => {
  try {
    const categories = await CategorySchema.find({
      type: req.params.categoryType,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    const category = await CategorySchema.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/category/:categoryId", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    const category = user.categories.id(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    Object.assign(category, req.body);
    await user.save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/category/:categoryId", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    const category = user.categories.id(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.remove();
    await user.save();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const categoryRouter = router;
export default categoryRouter;
