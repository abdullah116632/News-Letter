import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";
import cloudinary from "../db/cloudinaryConnection.js";
import generateTokenAndSetToken from "../utils/generateToken.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

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

    const response = await uploadToCloudinary(req.file.buffer, "newsLater/user-profilePic");

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
