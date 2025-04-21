const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

const authorizeCompanyAccess = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Admin has access to all companies
    if (user.role === 'admin') {
      return next();
    }

    // For non-admins, check if companyId matches requested resource companyId
    // Assuming companyId is passed in req.params or req.body for relevant routes
    const companyId = req.params.companyId || req.body.companyId;
    if (companyId && user.companyId !== parseInt(companyId)) {
      return res.status(403).json({ message: 'Forbidden: Access to this company data denied' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  authorizeCompanyAccess,
};
