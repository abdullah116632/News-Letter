import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { checkSubscriptionStatus, handleSuccess, handleWebHook, renew, subscribe } from "../controllers/paymentController.js";
;

const router = express.Router();

router.get("/check", protectRoute, checkSubscriptionStatus);

router.post("/subscribe", protectRoute, subscribe);
router.post("/renew", protectRoute, renew);

router.post("/success", handleSuccess);
router.post("/webhook", handleWebHook);






export default router;