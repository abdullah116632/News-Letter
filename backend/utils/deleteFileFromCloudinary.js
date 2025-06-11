import cloudinary from "../db/cloudinaryConnection.js";


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
      throw new Error(
        "image was not deleted successfully from cloudnary. Please try again"
      );
    }
  } catch (error) {
    throw new Error(error);
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
      throw new Error(
        "image was not deleted successfully from cloudnary. Please try again"
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { deleteImageFromCloudinary, deleteUserImageFromCloudinary };
