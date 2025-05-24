import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";
import { deleteImageFromCloudinary } from "../utils/deleteFileFromCloudinary.js";

export const getMe = async (req, res, next) => {
  try {
    // req.user is set by protect middleware
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "-password -confirmPassword"
    );
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return next(new CustomError(400, "Email parameter is required"));
    }

    const user = await User.findOne({ email }).select(
      "-password -confirmPassword"
    );
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    if (!fullName) {
      return next(new CustomError(400, "full name is required"));
    }

    let imgUrl;
    if (req.file) {
      await deleteImageFromCloudinary(req.user.img);
      const response = await uploadToCloudinary(req.file.buffer, "newsLater/user-profilePic");
      imgUrl = response.secure_url;
    }

    const allowedFields = [
      "fullName",
      "profession",
      "occupation",
      "institute",
      "fieldOfStudy",
      "interests",
      "priorResearchExperience",
      "englishProficiency",
      "preferredDegree",
      "countrypreference",
      "internshipJobPreferences",
      "preferredFieldsofOpportunity",
      "skills",
    ];

    const filteredBody = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });

    if (imgUrl) {
      filteredBody.img = imgUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      { new: true, runValidators: true }
    ).select("-password -confirmPassword");

    res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    next(err);
  }
};

