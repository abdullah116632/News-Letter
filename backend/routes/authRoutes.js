import express from "express";
import { deleteUser, forgotPassword, login, logout, resetPassword, signup, updatePassword, verifyOtp } from "../controllers/authController.js";
import { upload } from "../middleware/fileUpload.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", upload.single("img"), signup);
router.post("/login", login);
router.post("/logout", logout)
router.post("/update-password", protectRoute, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.delete("/", protectRoute, deleteUser);

export default router;