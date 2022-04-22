const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum:["student", "teacher", "admin"],
    default: "student"
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
