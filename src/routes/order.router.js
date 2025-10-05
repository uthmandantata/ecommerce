import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { createOrder, getAnOrder, getMyOrder, getOrder } from "../controllers/order.controller.js";

const router = express.Router();


router.get("/", protect, isAdmin, getOrder);
router.get("/order/:id", protect, isAdmin, getAnOrder);
router.get("/my-orders", protect, getMyOrder);
router.post("/create-order", protect, createOrder);



export default router;