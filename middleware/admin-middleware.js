const isAdminUser = (req, res, next) => {
    // ✅ Safety check in case authMiddleware didn't attach user info
    if (!req.userInfo) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. No user info found.",
        });
    }

    // ✅ Check if user role is admin
    if (req.userInfo.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied! Admin rights required.",
        });
    }

    // ✅ User is admin, continue
    next();
};

module.exports = isAdminUser;
