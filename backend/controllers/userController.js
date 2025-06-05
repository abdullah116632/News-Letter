import Subscription from "../models/subscriptionModel.js";
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
    console.log(req.body);
    const { fullName } = req.body;
    if (!fullName) {
      return next(new CustomError(400, "full name is required"));
    }

    let imgUrl;
    if (req.file) {
      await deleteImageFromCloudinary(req.user.img);
      const response = await uploadToCloudinary(
        req.file.buffer,
        "newsLater/user-profilePic"
      );
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
      return next(
        new CustomError(
          404,
          `Page ${page} does not exist. Only ${totalPages} page(s) available.`
        )
      );
    }

    const users = await User.find({})
      .select("img fullName email isSubscribed isAdmin isAdded")
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

export const getAllSubscribedUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const aggregatePipeline = [
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$user",
          latestSubscription: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          user: {
            _id: "$userInfo._id",
            fullName: "$userInfo.fullName",
            email: "$userInfo.email",
            img: "$userInfo.img",
            isAdmin: "$userInfo.isAdmin",
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const result = await Subscription.aggregate(aggregatePipeline);
    const total = await Subscription.distinct("user");
    const totalPages = Math.ceil(total.length / limit);

    const usersOnly = result.map(item => item.user);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalSubscribers: total.length,
      data: { users: usersOnly },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getActiveSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const aggregatePipeline = [
      { $match: { status: "active" } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$user",
          latestSubscription: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          user: {
            _id: "$userInfo._id",
            fullName: "$userInfo.fullName",
            email: "$userInfo.email",
            img: "$userInfo.img",
            isAdmin: "$userInfo.isAdmin",
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const result = await Subscription.aggregate(aggregatePipeline);
    const total = await Subscription.distinct("user", { status: "active" });
    const totalPages = Math.ceil(total.length / limit);

    const usersOnly = result.map(item => item.user);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalSubscribers: total.length,
      data: { users: usersOnly },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getExpiredSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const aggregatePipeline = [
      { $match: { status: "expired" } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$user",
          latestSubscription: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          user: {
            _id: "$userInfo._id",
            fullName: "$userInfo.fullName",
            email: "$userInfo.email",
            img: "$userInfo.img",
            isAdmin: "$userInfo.isAdmin",
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const result = await Subscription.aggregate(aggregatePipeline);
    const total = await Subscription.distinct("user", { status: "expired" });
    const totalPages = Math.ceil(total.length / limit);

    const usersOnly = result.map(item => item.user);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalSubscribers: total.length,
      data: { users: usersOnly },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateAdminAccess = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Prevent self-admin status change
    if (req.user._id.toString() === userId) {
      return res
        .status(403)
        .json({ message: "You cannot change your own admin access" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent removing admin from the last admin
    if (user.isAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount === 1) {
        return res.status(400).json({
          message:
            "At least one admin must exist. You cannot remove admin access from the last admin.",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: !user.isAdmin },
      { new: true }
    );

    res.status(200).json({
      message: `Admin access ${
        updatedUser.isAdmin ? "granted" : "removed"
      } successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating admin access:", error);
    next(error);
  }
};
