const Image = require('../models/Image');
const { uploadToCloudinary, deleteFromCloudinary } = require('../helpers/cloudinary-helper');

// ===============================
// 📤 Upload Image Controller
// ===============================
const uploadImage = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No user info found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded!",
      });
    }

    // Upload to Cloudinary using helper
    const result = await uploadToCloudinary(req.file.path);

    // Save image to DB
    const newImage = await Image.create({
      url: result.url,
      public_id: result.public_id, // ✅ matches Mongoose schema
      title: req.body.title || "Untitled Image",
      description: req.body.description || "",
      uploadedBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully!",
      data: newImage,
    });

  } catch (error) {
    console.error("❌ Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during image upload. Please try again.",
    });
  }
};

// ===============================
// 📥 Fetch Images Controller
// ===============================
const fetchImages = async (req, res) => {
  try {
    // 1️⃣ Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2️⃣ Sorting
    const sortBy = req.query.sortBy || 'createdAt'; // default sort
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    // 3️⃣ Optional filter for "mine=true"
    const filter = req.query.mine === "true" && req.user?.userId
      ? { uploadedBy: req.user.userId }
      : {};

    // 4️⃣ Fetch images with filter, pagination, and sorting
    const images = await Image.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .populate("uploadedBy", "username email");

    // 5️⃣ Total documents for pagination info
    const totalImages = await Image.countDocuments(filter);
    const totalPages = Math.ceil(totalImages / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages,
      count: images.length,
      data: images,
    });

  } catch (error) {
    console.error("❌ Fetch images error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching images.",
    });
  }
};

// ===============================
// 🗑 Delete Image Controller
// ===============================
const deleteImage = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No user info found.",
      });
    }

    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    // Only allow owner or admin
    if (image.uploadedBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this image.",
      });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(image.public_id);

    // Delete from DB
    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully!",
    });

  } catch (error) {
    console.error("❌ Delete image error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the image. Please try again.",
    });
  }
};

module.exports = { uploadImage, fetchImages, deleteImage };







