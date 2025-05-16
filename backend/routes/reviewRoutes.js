import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReview,
} from "../controllers/reviewController.js";
import protectRoute from "../middleware/protectRoute.js"
import adminProtect from "../middleware/adminProtect.js"


const router = express.Router();

router.post("/", protectRoute, createReview); // create review
router.get("/", getAllReviews); // get all reviews with pagination
router.get("/:id", getReviewById); // get single review
router.delete("/:id", adminProtect, deleteReview); // delete review

export default router;
