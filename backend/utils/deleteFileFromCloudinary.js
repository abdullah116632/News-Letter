import cloudinary from "../db/cloudinaryConnection.js";
import CustomError from "./customErrorClass.js";


const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const pathSegment = imageUrl.split("/");

    const lastSegment = pathSegment[pathSegment.length - 1];
    const idSegment = lastSegment.split(".");
    const publicId = idSegment[0];

    const { result } = await cloudinary.uploader.destroy(
      `newsLater/blogs-img/${publicId}`
    );

    if (result !== "ok") {
      throw new CustomError(
        400,
        "Image was not deleted successfully from Cloudinary. Please try again."
      );
    }
  } catch (error) {
    throw new CustomError(500, error.message || "Image deletion failed");
  }
};

const deleteUserImageFromCloudinary = async (imageUrl) => {
  try {
    const pathSegment = imageUrl.split("/");

    const lastSegment = pathSegment[pathSegment.length - 1];
    const idSegment = lastSegment.split(".");
    const publicId = idSegment[0];

    const { result } = await cloudinary.uploader.destroy(
      `newsLater/user-profilePic/${publicId}`
    );

    if (result !== "ok") {
      throw new CustomError(
        400,
        "Image was not deleted successfully from Cloudinary. Please try again."
      );
    }
  } catch (error) {
    throw new CustomError(500, error.message || "Image deletion failed");
  }
};

export { deleteImageFromCloudinary, deleteUserImageFromCloudinary };
