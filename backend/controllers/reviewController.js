import Review from "../models/reviewModel.js";
import CustomError from "../utils/customErrorClass.js";

// Create Review
export const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return next(new CustomError(400, "Rating and comment are required"));
    }

    const review = await Review.create({
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      status: "success",
      data: { review },
    });
  } catch (err) {
    next(err);
  }
};

//  Get All Reviews (with Pagination)
export const getAllReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9; // or 7 if you prefer
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments();
    const reviews = await Review.find()
      .populate("user", "fullName img profession institution")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: reviews.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: { reviews },
    });
  } catch (err) {
    next(err);
  }
};

// Get Single Review
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate("user", "fullName img");

    if (!review) {
      return next(new CustomError(404, "Review not found"));
    }

    res.status(200).json({
      status: "success",
      data: { review },
    });
  } catch (err) {
    next(err);
  }
};

// Delete Review
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new CustomError(404, "Review not found"));
    }

    // Optionally, restrict deletion to review owner or admin
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return next(new CustomError(403, "You are not allowed to delete this review"));
    }

    await review.deleteOne();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
