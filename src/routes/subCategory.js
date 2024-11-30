// import express from "express";
// import { UserSchema } from "../mongoose/schemas/user.js";
// import { checkSession } from "../middlewares/checkSession.js";
// import { loggingMiddleware } from "../middlewares/logging.js";
// import { allowCORSMiddleware } from "../middlewares/allowCORS.js";

// const router = express.Router();

// // middleware
// router.use(
//   checkSession,
//   loggingMiddleware,
//   allowCORSMiddleware(process.env.ALLOW_CORS),
// );

// // routes
// router.post("/category/:categoryId/sub-category", async (req, res) => {
//   try {
//     const user = await UserSchema.findById(req.user._id);
//     const category = user.categories.id(req.params.categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     category.sub_categories.push(req.body);
//     await user.save();
//     res.status(201).json(category.sub_categories);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.put(
//   "/category/:categoryId/sub-category/:subCategoryId",
//   async (req, res) => {
//     try {
//       const user = await UserSchema.findById(req.user._id);
//       const category = user.categories.id(req.params.categoryId);
//       if (!category) {
//         return res.status(404).json({ message: "Category not found" });
//       }
//       const subCategory = category.sub_categories.id(req.params.subCategoryId);
//       if (!subCategory) {
//         return res.status(404).json({ message: "Sub-category not found" });
//       }
//       Object.assign(subCategory, req.body);
//       await user.save();
//       res.json(subCategory);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },
// );

// router.delete(
//   "/category/:categoryId/sub-category/:subCategoryId",
//   async (req, res) => {
//     try {
//       const user = await UserSchema.findById(req.user._id);
//       const category = user.categories.id(req.params.categoryId);
//       if (!category) {
//         return res.status(404).json({ message: "Category not found" });
//       }
//       const subCategory = category.sub_categories.id(req.params.subCategoryId);
//       if (!subCategory) {
//         return res.status(404).json({ message: "Sub-category not found" });
//       }
//       subCategory.remove();
//       await user.save();
//       res.status(204).end();
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },
// );

// export default router;
