const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, "A user must have a name"],
  //   //TODO: Have to fix even space not allowing
  //   validate: [validator.isAlpha, "Only Alphabates are allowed"],
  // },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
