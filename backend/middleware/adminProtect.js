import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";

const adminProtect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new CustomError(401, "You are not logged in"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
    return next(new CustomError(401, "unothorized , invalid token"));
  }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    if (!user.isVerified) {
      return next(
        new CustomError(403, "Account not verified. Please verify your email.")
      );
    }

    if (!user.isAdmin) {
      return next(new CustomError(403, "Access denied. Admins only."));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default adminProtect;
