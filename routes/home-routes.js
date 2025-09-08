const express = require('express');
const authMiddleware = require('../middleware/auth-middleware'); // ✅ Protect route
const router = express.Router();

// ✅ Protected Welcome Route
router.get('/welcome', authMiddleware, (req, res) => {
    
        res.json({
        success: true,
        message: `Welcome to home page, ${req.user.username}! 🎉`,
        user: req.user, // Send decoded token data for debugging
        
        
    });
});

module.exports = router;
