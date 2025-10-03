import express from "express";
import { deleteProfile, myprofile, updateProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.js";


const router = express.Router();

router.get("/my-profile", protect, myprofile)
router.put("/update-profile/:id", protect, updateProfile)
router.delete("/delete-profile/:id", protect, deleteProfile)


export default router;