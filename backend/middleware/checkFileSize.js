import CustomError from "../utils/customErrorClass.js";

// Middleware to check file size
export const checkFileSize = (maxSizeInMB) => {
  return (req, res, next) => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to Bytes

    if (req.file && req.file.size > maxSizeInBytes) {
      return next(new CustomError(400, `Image too large. Maximum allowed size is ${maxSizeInMB}MB.`))
    }

    next();
  };
};
