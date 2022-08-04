const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  note: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
