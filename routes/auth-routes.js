const express = require("express");
const router = express.Router();
const { registerUser, loginUser, changePassword } = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware"); // ✅ fixed path

// 📝 User Registration
router.post("/register", registerUser);

// 🔑 User Login
router.post("/login", loginUser);

// 🔄 Change Password (Requires Auth)
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;





