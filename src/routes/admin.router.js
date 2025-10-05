import express from "express";

import { isAdmin, protect } from "../middleware/protect.js";
import { createAdmin, dashboard } from "../controllers/admin.controller.js";

const router = express.Router();


router.get("/", protect, isAdmin, dashboard);
router.put("/create-admin/:id", protect, isAdmin, createAdmin);



export default router;