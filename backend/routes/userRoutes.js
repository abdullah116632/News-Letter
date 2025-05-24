import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMe, getUserByEmail, updateProfile } from "../controllers/userController.js";
import { upload } from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/", protectRoute, getMe)
router.get("/:email", protectRoute, getUserByEmail)
router.patch("/", protectRoute, upload.single("img"), updateProfile);

export default router;