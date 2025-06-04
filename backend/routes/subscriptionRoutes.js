import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getActiveSubscription, handleSuccess, handleWebHook, updatePackageWithCharge, subscribe, updatePackageForFree } from "../controllers/subscriptionController.js";
;

const router = express.Router();

router.get("/active", protectRoute, getActiveSubscription);

router.post("/subscribe", protectRoute, subscribe);
router.post("/update-package/with-charge/:subscriptionId", protectRoute, updatePackageWithCharge);
router.patch("/update-package/free/:subscriptionId", protectRoute, updatePackageForFree);

router.post("/success", handleSuccess);
router.post("/webhook", handleWebHook);





export default router;