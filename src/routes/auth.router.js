import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/protect.js";

const router = express.Router();

router.post("/register", isLoggedIn, register)
router.post("/login", isLoggedIn, login)
router.post("/logout", logout)

export default router;