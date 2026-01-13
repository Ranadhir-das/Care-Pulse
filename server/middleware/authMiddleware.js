const jwt = require('jsonwebtoken');

/**
 * Middleware to verify if the user is logged in (General)
 */
const verifyToken = (req, res, next) => {
    const token = req.header('token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

/**
 * Middleware to verify if the user is an Admin
 */
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    });
};

/**
 * Middleware to verify if the user is a Store Owner
 */
const verifyStore = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'store' || req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. Store owners only." });
        }
    });
};

module.exports = { verifyToken, verifyAdmin, verifyStore };