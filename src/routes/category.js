import express from "express";
import { UserSchema } from "../mongoose/schemas/user.js";
import { checkSession } from "../middlewares/checkSession.js";
import { loggingMiddleware } from "../middlewares/logging.js";
import { allowCORSMiddleware } from "../middlewares/allowCORS.js";

const router = express.Router();

// middleware
router.use(
  checkSession,
  loggingMiddleware,
  allowCORSMiddleware(process.env.ALLOW_CORS),
);

// routes
router.post("/category", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    user.categories.push(req.body);
    await user.save();
    res.status(201).json(user.categories);
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
