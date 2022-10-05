const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
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
    res
      .status(401)
      .json({ error: req.headers.authorization ? error : "No token provided" });
  }
};
