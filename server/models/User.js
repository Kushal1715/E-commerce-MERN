const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    requred: true,
    unique: true,
  },
  email: {
    type: String,
    requred: true,
    unique: true,
  },
  password: {
    type: String,
    requred: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
