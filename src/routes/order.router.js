import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { checkout, getAnOrder, getMyOrder, getOrder } from "../controllers/order.controller.js";

const router = express.Router();


router.get("/", protect, isAdmin, getOrder);
router.get("/order/:id", protect, isAdmin, getAnOrder);
router.get("/my-orders", protect, getMyOrder);
router.post("/checkout", protect, checkout);



export default router;