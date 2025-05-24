import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";
import generateTokenAndSetToken from "../utils/generateToken.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import compareString from "../utils/conpareString.js";

export const signup = async (req, res, next) => {
  console.log("request come");
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      const error = new CustomError(
        400,
        "fullName, email, password, confirmPassword are required"
      );
      return next(error);
    }

    if (!req.file) {
      const error = new CustomError(400, "Profile image is required.");
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new CustomError(400, "User already exist");
      return next(err);
    }

    if (password !== confirmPassword) {
      const err = new CustomError(
        400,
        "password and confirm password must be same"
      );
      return next(err);
    }

    const response = await uploadToCloudinary(
      req.file.buffer,
      "newsLater/user-profilePic"
    );

    const newUser = new User({
      fullName,
      email,
      password,
      confirmPassword,
      img: response.secure_url,
    });

    await newUser.save();
    generateTokenAndSetToken(newUser._id, res);

    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.confirmPassword;

    res.status(201).json({
      status: "success",
      data: {
        user: userResponse,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return next(new CustomError(400, "Email and password are required"));
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new CustomError(401, "Invalid email or password"));
    }

    // Compare password
    const isPasswordValid = await compareString(password, user.password);
    if (!isPasswordValid) {
      return next(new CustomError(401, "Invalid email or password"));
    }

    // Set JWT token in cookie
    generateTokenAndSetToken(user._id, res);

    // Prepare response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      status: "success",
      data: {
        user: userResponse,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
    data: null,
  });
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if(!currentPassword || !newPassword || !confirmPassword){
      return next(new CustomError(400, "current password and new password confirmPassword are required"))
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    if (newPassword !== confirmPassword) {
      const err = new CustomError(
        400,
        "password and confirm password must be same"
      );
      return next(err);
    }

    const isPasswordValid = await compareString(currentPassword, user.password);
    if (!isPasswordValid) {
      return next(new CustomError(401, "Current password is incorrect"));
    }

    user.password = newPassword;
    user.confirmPassword = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
