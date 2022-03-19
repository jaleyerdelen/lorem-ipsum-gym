const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: "string",
  },
  email: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
