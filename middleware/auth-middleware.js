// middleware/auth-middleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('🔑 Authorization Header:', authHeader || '❌ No Authorization Header Found');

  // Extract token from "Bearer <token>"
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided. Please login to continue'
    });
  }

  try {
    console.log('✅ Using JWT Secret:', process.env.JWT_SECRET_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      throw new Error("Decoded token is null or undefined");
    }

    console.log('✅ Decoded Token:', decoded);

    // Attach decoded token info to request for downstream use
    req.user = decoded;

    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token. Please login again.'
    });
  }
};

module.exports = authMiddleware;




