import cloudinary from "../db/cloudinaryConnection.js";

// /**
//  * Uploads a file buffer to Cloudinary
//  * @param {Buffer} fileBuffer - The file buffer from multer memoryStorage
//  * @param {string} folderPath - Cloudinary folder path
//  * @returns {Promise<Object>} - Cloudinary response object
//  */
const uploadToCloudinary = (fileBuffer, folderPath) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

export default uploadToCloudinary;
