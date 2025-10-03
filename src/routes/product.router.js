import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.get("/", protect, getProduct)
router.post("/create-product", protect, isAdmin, createProduct)
router.put("/update-product/:id", protect, updateProduct)
router.delete("/delete-product/:id", protect, deleteProduct)


export default router;