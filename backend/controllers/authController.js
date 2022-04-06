const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;

// const signJwt = (id, name) => {
//    console.log(id, name)
//   return jwt.sign({ id, name }, JWT_SECRET, {
//     expiresIn: JWT_EXPIRES,
//   });
// };


//shorter code
const sendToken = (user, req, res) => {
const token = jwt.sign({id: user._id, name: user.name}, JWT_SECRET, {expiresIn: JWT_EXPIRES})
res.cookie("jwt", token,  { httpOnly: true })
res.status(200).json({
  status: "success",
     token,
})
}


// const sendToken = (user, statusCode, req, res) => {
//   const token = signJwt(user._id, user.name);
//   console.log("controldeki token",token)
//   const options = {
//     expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
//     secure: NODE_ENV === "prodution" ? true : false,
//     httpOnly: NODE_ENV === "prodution" ? true : false,
//   };
//   res.cookie("jwt", token, options);
//   user.password = undefined;
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     user,
//   });
// };

exports.createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // console.log(email)
    if (!(email && password && name)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    const user = await User.create({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // res.status(200).json({ message: `${name} created` });
    sendToken(user, 200, req, res);
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
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      const compared = bcrypt.compare(password, user.password);
      compared
        ? sendToken(user, req, res)
        : res.status(400).json({ message: "login failed" });
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
  res.status(200).json({ status: "success" });
};
