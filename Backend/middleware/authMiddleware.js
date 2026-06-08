const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      req.user = null;

      return next();
    }


    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Optional auth failed:", error.message);

    req.user = null;

    next();
  }
};

module.exports = authMiddleware;
