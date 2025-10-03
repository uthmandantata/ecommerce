import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.constroller.js";


const router = express.Router();

router.get("/", protect, getCategory)
router.post("/create-category", protect, isAdmin, createCategory)
router.put("/update-category/:id", protect, updateCategory)
router.delete("/delete-category/:id", protect, deleteCategory)


export default router;