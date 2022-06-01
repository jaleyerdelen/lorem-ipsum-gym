const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User");

exports.secure = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) {
      return res.status(400).json({
        status: "unauthorized",
      });
    }
    const test = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(test.id);
    if (!user) {
      return res.status(400).json({
        status: "unauthorized",
        message: "You are not authorized to view this content",
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
