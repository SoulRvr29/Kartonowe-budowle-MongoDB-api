const mongoose = require("mongoose");
const { type } = require("os");

const infoSchema = new mongoose.Schema(
  {
    title: { type: String },
    entries: { type: Object },
    list: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Info", infoSchema);
