const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.includes(" ")
      ? req.headers.authorization.split(" ")[1]
      : authHeader;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // get values from the decoded token
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    req.auth = {
      userId: userId,
      role: role,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: authHeader ? error : "No token provided" });
  }
};
