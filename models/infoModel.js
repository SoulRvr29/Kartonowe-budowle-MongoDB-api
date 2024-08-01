const mongoose = require("mongoose");
const { type } = require("os");

const infoSchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Info", infoSchema);
