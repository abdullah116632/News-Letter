import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {  handleCancel, handleFail, handleInstantPaymentNotification, handleSuccess, payment } from "../controllers/paymentController.js";
;

const router = express.Router();

router.post("/", protectRoute, payment);
router.post("/success/:tran_id", handleSuccess);
router.post("/fail/:tran_id", handleFail);
router.post("/cancel/:tran_id", handleCancel);
router.post("/ipn/:tran_id", handleInstantPaymentNotification);



export default router;