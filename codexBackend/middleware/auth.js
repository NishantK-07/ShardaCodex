// middleware/auth.js - ADD THIS
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Usermodel');

// Existing authMiddleware (required auth)
async function authMiddleware(req, res, next) {
  try {
    // Read token from cookie
    const token = req.cookies.jwt; // <--- use cookie

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY); // make sure to use same secret
      console.log('Decoded JWT:', decoded); // { id: "..." }
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await UserModel.findById(decoded.id); // use decoded.id, not decoded.userId
    if (!user) return res.status(401).json({ message: 'User not found' });


    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// NEW: Optional auth (adds user if token exists, but doesn't require it)
async function optionalAuth(req, res, next) {
  try {
    const token = req.cookies.jwt;
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
    
    next(); // Continue regardless of auth status
  } catch (error) {
    // Invalid token, but that's okay for optional auth
    next();
  }
}
function teacherMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'Teacher') {
    return res.status(403).json({ message: 'Access denied. Teacher only.' });
  }
  next();
}
module.exports = { authMiddleware, optionalAuth,teacherMiddleware  };