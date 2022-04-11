const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.secure = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("headers", req.headers);
    const token = authHeader && authHeader.split(" ")[1];
    const test = jwt.verify(token, JWT_SECRET);
    console.log("test", test);
    return next();
  } catch (error) {
    res.status(200).json({
      error,
    });
  }
  next();
};
