import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUser, getMe, getSubscribedUsers, getUserByEmail, updateAdminAccess, updateProfile } from "../controllers/userController.js";
import { upload } from "../middleware/fileUpload.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

router.get("/", protectRoute, getMe)
router.get("/:email", protectRoute, getUserByEmail)
router.get("/all/all", adminProtect, getAllUser);
router.get("/subscribed/all", adminProtect, getSubscribedUsers);
router.patch("/", protectRoute, upload.single("img"), updateProfile);
router.put("/admin-access/:userId", adminProtect, updateAdminAccess);

export default router;