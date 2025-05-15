import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMe, getUserByEmail } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protectRoute, getMe)
router.get("/:email", protectRoute, getUserByEmail)

export default router;