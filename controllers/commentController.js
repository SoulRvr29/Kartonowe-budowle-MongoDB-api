const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");
const { text } = require("body-parser");

// @desc  Get comment
// @route GET /api/comments
// @access Private
const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.find();
  // console.log(comment);
  res.status(200).json(comment);
});

// @desc  Post comment
// @route POST /api/comments
// @access Private
const setComment = asyncHandler(async (req, res) => {
  // if (!req.body.title) {
  //   res.status(400);
  //   throw new Error("Please add a title");
  // }
  const comment = await Comment.create(req.body);
  console.log(comment);

  res.status(200).json(comment);
});

// @desc  Update comment
// @route PUT /api/comments
// @access Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  // console.log(req);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body } },
    { new: true }
  );

  res.status(200).json(updatedComment);
});

// @desc  Delete comment
// @route DELETE /api/comments
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: { _id: req.body.commentID } } },
    { new: true }
  );

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getComment,
  setComment,
  updateComment,
  deleteComment,
};
