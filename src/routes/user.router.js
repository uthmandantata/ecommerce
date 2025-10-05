import express from "express";
import { deleteProfile, deleteUser, myprofile, updateProfile } from "../controllers/user.controller.js";
import { isAdmin, protect } from "../middleware/protect.js";


const router = express.Router();

router.get("/my-profile", protect, myprofile)
router.put("/update-profile/:id", protect, updateProfile)
router.delete("/delete-profile/:id", protect, deleteProfile)
router.delete("/delete-user/:id", protect, isAdmin, deleteUser)


export default router;