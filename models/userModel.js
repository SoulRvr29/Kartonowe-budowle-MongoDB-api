const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    login: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean },
    picture: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
