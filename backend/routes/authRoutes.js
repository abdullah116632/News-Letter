import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { upload } from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/signup", upload.single("img"), signup);
router.post("/login", login);
router.post("/logout", logout)

export default router;