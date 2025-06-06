import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getActiveSubscribers, getAllUser, getExpiredSubscribers, getMe, getAllSubscribedUsers, getUserByEmail, updateAdminAccess, updateProfile, updateSkills } from "../controllers/userController.js";
import { upload } from "../middleware/fileUpload.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

router.get("/", protectRoute, getMe)
router.get("/:email", protectRoute, getUserByEmail)
router.get("/all/all", adminProtect, getAllUser);
router.get("/subscribed/all", adminProtect, getAllSubscribedUsers);
router.get("/subscribed/active", adminProtect, getActiveSubscribers);
router.get("/subscribed/expired", adminProtect, getExpiredSubscribers);
router.patch("/", protectRoute, upload.single("img"), updateProfile);
router.put("/update-skills", protectRoute, updateSkills);
router.put("/admin-access/:userId", adminProtect, updateAdminAccess);

export default router;