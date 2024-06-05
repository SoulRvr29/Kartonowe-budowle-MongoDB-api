const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    comments: [
      {
        login: { type: String, required: true },
        comment: { type: String, required: true },
        likes: {
          quantity: { type: Number, default: 0 },
          users: [{ type: String }],
        },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        admin: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
