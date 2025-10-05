import express from "express";

import { protect } from "../middleware/protect.js";
import { clearCart, createAndAddCart, getCart, removefromCart } from "../controllers/cart.controller.js";

const router = express.Router();


router.get("/my-cart", protect, getCart);
router.post("/create-cart", protect, createAndAddCart);
router.put("/remove-item-cart", protect, removefromCart);
router.delete("/clear-cart", protect, clearCart);


export default router;