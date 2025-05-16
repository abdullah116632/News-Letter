import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";

export const adminProtect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new CustomError(401, "You are not logged in"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ error: "unothorized , invalid token" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    if (!user.isAdmin) {
      return next(new CustomError(403, "Access denied. Admins only."));
    }

    req.user = user; // attach user info to request
    next();
  } catch (err) {
    next(err);
  }
};
