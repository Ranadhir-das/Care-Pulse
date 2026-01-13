const jwt = require('jsonwebtoken');

module.exports = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};