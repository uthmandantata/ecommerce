import express from "express";

import { protect } from "../middleware/protect.js";
import { clearCart, createCart, deleteCartProduct, getCart, updateCart } from "../controllers/cart.controller.js";

const router = express.Router();


router.get("/my-cart", protect, getCart);
router.post("/create-cart", protect, createCart);
router.put("/update-cart", protect, updateCart);
router.delete("/delete-cart-product/:id", protect, deleteCartProduct);
router.delete("/clear-cart/:id", protect, clearCart);


export default router;