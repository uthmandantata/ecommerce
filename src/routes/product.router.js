import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { createProduct, deleteProduct, getAProduct, getProduct, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.get("/", protect, getProduct);
router.get("/:id", protect, getAProduct);
router.post("/create-product", protect, isAdmin, createProduct);
router.put("/update-product/:id", protect, updateProduct);
router.delete("/delete-product/:id", protect, deleteProduct);


export default router;