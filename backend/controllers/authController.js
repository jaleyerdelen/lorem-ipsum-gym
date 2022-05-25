const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;
const MAILPS = process.env.MAILPS;

const nodemailer = require("nodemailer");

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
    const user = await User.find().populate("courses");
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

exports.getProfile = async (req, res) => {
  console.log(req.user);
  try {
    const profile = await User.findById(req.user._id).populate("courses");
    res.status(200).json({
      message: "success",
      profile,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (user) {
        const compared = bcrypt.compare(password, user.password);
        compared
          ? sendToken(user, 200, req, res)
          : res.status(200).json({ message: "login failed" });
      } else {
        res.status(200).json({
          status: "fail",
          message: "user can not found",
        });
      }
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
      ? next()
      : res.status(200).json({
          status: "unauthorize",
          message: "You are not allowed to",
        });
  };
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne(user);
      res.status(200).json({
        message: "deleted user",
        user,
      });
    } else {
      res.status(200).json({
        status: "fail",
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "fail",
      err,
    });
  }
};

exports.contactGetUser = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      err,
    });
  }
};

exports.contactUser = async (req, res) => {
  console.log(req.body);
  try {
    const outputMessage = `
   <h1>Message Details</h1>
   <ul>
   <li>Name: ${req.body.name}</li>
   <li>Email: ${req.body.email}</li>
   </ul>
   <h1>Message</h1>
   <p>${req.body.message}</p>
   `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ginbluesama@gmail.com", // gmail account
        pass: MAILPS, // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Lore ipsum gym contact form" <jaleyerdelen@gmail.com>', // sender address
      to: "ginbluesama@gmail.com", // list of receivers
      subject: "Lore ipsum gym contact form new message ✔", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.status(200).json({
      message: "sended",
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "error",
      err,
    });
  }
};
