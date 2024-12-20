const jwt = require('jsonwebtoken');

// JWT Middleware for Authentication\

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      req.user = decoded;
      
      next();
    });
  };
  
  // Middleware to check if user is admin
  const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin'){
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  };
  
  // Middleware to check if user is a regular user
  const verifyUser = (req, res, next) => {
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied. User only.' });
    }
    next();
  };
  const verifyRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Access denied. ${role.charAt(0).toUpperCase() + role.slice(1)} only.` });
        }
        next();
    };
};
module.exports={verifyToken,verifyAdmin,verifyUser,verifyRole }