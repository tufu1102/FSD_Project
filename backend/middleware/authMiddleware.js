const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const secret = process.env.JWT_SECRET || 'skyreserve_jwt_fallback_secret';

    let userId;

    try {
      // Try JWT first (new flow)
      const decoded = jwt.verify(token, secret);
      userId = decoded.id;
    } catch (jwtError) {
      // Fallback: support legacy string tokens like "token_<userId>_<timestamp>"
      if (token.startsWith('token_')) {
        const parts = token.split('_');
        if (parts.length >= 2) {
          userId = parts[1];
        }
      }

      if (!userId) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
