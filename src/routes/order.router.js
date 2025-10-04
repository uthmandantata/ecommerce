import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { adminDashboard, createOrder, getAnOrder, getMyOrder, getOrder } from "../controllers/order.controller.js";

const router = express.Router();


router.get("/", protect, isAdmin, getOrder);
router.get("/order/:id", protect, isAdmin, getAnOrder);
router.get("/my-orders", protect, getMyOrder);
router.post("/create-order", protect, createOrder);

router.get("/admin", protect, isAdmin, adminDashboard);
// router.delete("/delete-order/:id", protect, deleteOrder);


export default router;