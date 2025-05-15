import express from "express";
import { signup } from "../controllers/authController.js";
import { upload } from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/signup", upload.single("img"), signup);
// router.route("/login");

export default router;