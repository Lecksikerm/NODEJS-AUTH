const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, fetchImages, deleteImage } = require('../controllers/image-controller');

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Middleware to inject a fixed user ID for testing
const testUserMiddleware = (req, res, next) => {
  req.user = {
    userId: "68becfa6fdbd9e1f3ef4fecb", // 🔑 fixed test user ID
    role: "user",                       // optional, for delete permissions
  };
  next();
};

// Routes
router.post('/upload', testUserMiddleware, upload.single('image'), uploadImage);
router.get('/', testUserMiddleware, fetchImages);
router.delete('/:id', testUserMiddleware, deleteImage);

module.exports = router;




