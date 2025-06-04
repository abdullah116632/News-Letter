import express from 'express';
import { createServicePlan } from '../controllers/servicePlanController.js';
import adminProtect from '../middleware/adminProtect.js';
import { getAllServicePlans } from '../controllers/servicePlanController.js';

const router = express.Router();

router.post('/add', adminProtect, createServicePlan);
router.get('/', getAllServicePlans);

export default router;
