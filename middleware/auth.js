const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });

      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };
};

module.exports = authMiddleware;
