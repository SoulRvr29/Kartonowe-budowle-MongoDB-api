const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  comments: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      likes: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Comment", commentSchema);