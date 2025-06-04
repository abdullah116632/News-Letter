import express from "express";
import { addTobrevo, removeFromBrevo } from "../controllers/brevoController.js";

const router = express.Router();

router.post("/add", addTobrevo)
router.post("/remove", removeFromBrevo)

export default router;