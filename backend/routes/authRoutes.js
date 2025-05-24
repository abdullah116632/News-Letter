import express from "express";
import { login, logout, signup, updatePassword } from "../controllers/authController.js";
import { upload } from "../middleware/fileUpload.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", upload.single("img"), signup);
router.post("/login", login);
router.post("/logout", logout)
router.post("/update-password", protectRoute, updatePassword);

export default router;