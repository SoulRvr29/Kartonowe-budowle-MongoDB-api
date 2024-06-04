const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");
const { text } = require("body-parser");

// @desc  Get comment
// @route GET /api/comments
const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.find();
  res.status(200).json(comment);
});

// @desc  Post comment
// @route POST /api/comments
const setComment = asyncHandler(async (req, res) => {
  // if (!req.body.title) {
  //   res.status(400);
  //   throw new Error("Please add a title");
  // }
  const comment = await Comment.create(req.body);
  console.log(comment);

  res.status(200).json(comment);
});

// @desc  Like comment
// @route PUT /api/comments/:sectionId/like/:commentId
const likeComment = asyncHandler(async (req, res) => {
  const section = await Comment.findById(req.params.sectionId);

  if (!section) {
    res.status(400);
    throw new Error("Section not found");
  }

  if (!section.comments[req.body.index].likes.users.includes(req.body.user)) {
    section.comments[req.body.index].likes.quantity += 1;
  }
  if (!section.comments[req.body.index].likes.users.includes(req.body.user)) {
    section.comments[req.body.index].likes.users.push(req.body.user);
  }
  await section.save();

  res.status(200).json(section);
});

// @desc  Update comment
// @route PUT /api/comments
const updateComment = asyncHandler(async (req, res) => {
  const section = await Comment.findById(req.params.id);
  // console.log(req);

  if (!section) {
    res.status(400);
    throw new Error("Comment not found");
  }
  section.comments[req.body.index].comment = req.body.comment;
  await section.save();

  res.status(200).json(section);
});

// @desc  Delete comment
// @route DELETE /api/comments
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
  likeComment,
};
