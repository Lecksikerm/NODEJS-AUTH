const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
    // ✅ Log for debugging
    console.log("🔎 req.userInfo received in admin route:", req.userInfo);

    // ✅ Defensive check to avoid crashing if something is wrong
    if (!req.userInfo || !req.userInfo.username) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. User information missing or invalid token."
        });
    }

    res.status(200).json({
        success: true,
        message: `Welcome ${req.userInfo.username}, to admin page!`
    });
});

module.exports = router;


