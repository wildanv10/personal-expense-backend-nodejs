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
router.get("/profile", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/profile", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    await user.remove();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
