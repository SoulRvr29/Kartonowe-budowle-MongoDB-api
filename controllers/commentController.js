const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");
const { text } = require("body-parser");

// @desc  Get comment
// @route GET /api/comments
const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.find();
  res.status(200).json(comment);
});

// @desc  Put comment
// @route PUT /api/comments/:id
const setComment = asyncHandler(async (req, res) => {
  const section = await Comment.findById(req.params.id);

  if (!section) {
    res.status(400);
    throw new Error("Section not found");
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body } },
    { new: true }
  );

  res.status(200).json(updatedComment);
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
// @route PUT /api/comments/:id/update
const updateComment = asyncHandler(async (req, res) => {
  const section = await Comment.findById(req.params.id);
  // console.log(req);

  if (!section) {
    res.status(400);
    throw new Error("Comment not found");
  }
  section.comments[req.body.index].comment = req.body.comment;
  section.comments[req.body.index].updatedAt = new Date(
    new Date().getTime() + 7200000
  );
  await section.save();

  res.status(200).json(section);
});

// @desc  Delete comment
// @route DELETE /api/comments/:id
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
