import otpGenerator from "otp-generator";
import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";
import generateTokenAndSetToken from "../utils/generateToken.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import compareString from "../utils/conpareString.js";
import Otp from "../models/otpModel.js";
import sendEmail from "../utils/sendMail.js";

export const signup = async (req, res, next) => {
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

    console.log(newUser);

    await sendEmail("signup", { user: newUser });

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

    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(
        new CustomError(
          400,
          "current password and new password confirmPassword are required"
        )
      );
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

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new CustomError(404, "User not found"));

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1500); // 15 mins

    await Otp.create({ email, otp, expiresAt });

    await sendEmail("otp", { user, otp });

    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return next(new CustomError(400, "Email and OTP required"));

    const record = await Otp.findOne({ email, otp });
    if (!record) return next(new CustomError(400, "Invalid OTP"));

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email }); // Optional cleanup
      return next(new CustomError(400, "OTP expired"));
    }

    // Mark the OTP as verified
    record.isverifyed = true;
    await record.save();

    res.status(200).json({
      success: true,
      message: "OTP is valid and verified",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return next(new CustomError(400, "All fields are required"));
    }

    if (newPassword !== confirmPassword) {
      return next(new CustomError(400, "Passwords do not match"));
    }

    const record = await Otp.findOne({ email, otp });
    if (!record || record.expiresAt < new Date()) {
      return next(new CustomError(400, "Invalid or expired OTP"));
    }

    if (!record.isverifyed) {
      return next(
        new CustomError(403, "OTP not verified. Please verify first.")
      );
    }

    const user = await User.findOne({ email }).select(
      "+password +confirmPassword"
    );
    if (!user) return next(new CustomError(404, "User not found"));

    // Set & save password
    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    await user.save();

    await Otp.deleteMany({ email }); // Clean up all OTPs for the user

    generateTokenAndSetToken(user._id, res); // Log the user in

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

export const deleteUser = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await User.findById(userId).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await compareString(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Delete user
    await User.findByIdAndDelete(userId);

    // Clear login cookie (logout)
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      status: "success",
      message: "User deleted and logged out successfully",
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
