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

export const getAllUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);


    if (page > totalPages && totalUsers > 0) {
      return next(new CustomError(404, `Page ${page} does not exist. Only ${totalPages} page(s) available.`));
    }

    const users = await User.find({})
      .select("img fullName email isSubscribed isAdmin")
      .skip(skip)
      .limit(limit);


    if (users.length === 0 && totalUsers === 0) {
      return next(new CustomError(404, "No users found in the database."));
    }

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalUsers,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getSubscribedUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const totalSubscribed = await User.countDocuments({ isSubscribed: true });
    const totalPages = Math.ceil(totalSubscribed / limit);

    if (totalSubscribed === 0) {
      return next(new CustomError(404, "No subscribed users found."));
    }

    if (page > totalPages) {
      return next(new CustomError(404, `Page ${page} does not exist. Only ${totalPages} page(s) available.`));
    }

    const users = await User.find({ isSubscribed: true })
      .select("img fullName email isSubscribed isAdmin")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalSubscribed,
      data: {
        users,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


export const updateAdminAccess = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Prevent self-admin status change
    if (req.user._id.toString() === userId) {
      return res.status(403).json({ message: "You cannot change your own admin access" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent removing admin from the last admin
    if (user.isAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount === 1) {
        return res.status(400).json({
          message: "At least one admin must exist. You cannot remove admin access from the last admin.",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: !user.isAdmin },
      { new: true }
    );

    res.status(200).json({
      message: `Admin access ${updatedUser.isAdmin ? "granted" : "removed"} successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating admin access:", error);
    next(error)
  }
};




