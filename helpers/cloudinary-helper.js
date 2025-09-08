// helpers/cloudinary-helper.js
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Upload image to Cloudinary
const uploadToCloudinary = async (filePath) => {
  if (!filePath) throw new Error("No file path provided for upload.");

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
      resource_type: "image",
    });

    // Remove local file after successful upload
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary
const deleteFromCloudinary = async (public_id) => {
  if (!public_id) throw new Error("No public_id provided for deletion.");
  return await cloudinary.uploader.destroy(public_id);
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };






