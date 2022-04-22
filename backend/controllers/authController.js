const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;

const sendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
  res.cookie("jwt", token, { httpOnly: true });
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.createUser = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    if (!(email && password && name)) {
      return res.status(200).send({ error: "Data not formatted properly" });
    }
    const user = await User.create({ name, email, password, role });
    console.log("user", user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    sendToken(user, 200, req, res);
    //  res.status(200).json({
    //    message: "User saved successfully",
    //  })
  } catch (error) {
    res.status(200).json({
      status: "error",
      error,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ email }, (err, user) => {
      const compared = bcrypt.compare(password, user.password);
      compared
        ? sendToken(user, 200, req, res)
        : res.status(200).json({ message: "login failed" });
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 10000),
    secure: NODE_ENV === "prodution" ? true : false,
    httpOnly: NODE_ENV === "prodution" ? true : false,
  };
  res.cookie("jwt", "expiredtoken", options);
  res.status(200).json({
    status: "success",
  });
};

exports.userRole = (...userRole) => {
  return (req, res, next) => {
    userRole.includes(req.user.role)
      ? // console.log( userRole.includes(req.user.role))
        // console.log("requser",req.user.role)
        next()
      : res.status(200).json({
          status: "unauthorizee",
          message: "You are not allowed to",
        });
  };
};
