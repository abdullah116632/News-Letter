import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new CustomError(401, "You are not logged in"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new CustomError(401, "unothorized , invalid token"));
  }

  const user = await User.findById(decoded.userId).select("+password");

  if (!user) {
    return next(new CustomError(404, "User not found"));
  }

  if (!user.isVerified) {
    return next(
      new CustomError(403, "Account not verified. Please verify your email.")
    );
  }

  req.user = user;
  next();
};

export default protectRoute;
