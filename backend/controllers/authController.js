const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!(email && password && name)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    const user = await User.create({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(201).json({ message: `${name} created` });
  } catch (error) {
    res.status(400).json({
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
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //user session
            req.session.userID = user._id;
            console.log(req.session.userID)
            res.status(200).json({ message: "here" ,
            session: req.session.userID
          });
            
          } else {
            res.status(404).json({ message: "not found" });
          }
        });
      } else {
        res.status(200).json({ message: "user not found" });
      }
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: error,
    });
  }
};

exports.logoutUser = (req, res) => {
  console.log(req.session);
  req.session.destroy(()=> {
    res.status(200).json({
      status: "success",
      message: "Logout success",
    });
  })
  ;
};
