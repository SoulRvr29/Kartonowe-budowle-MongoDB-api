const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const { text } = require("body-parser");

// @desc  Get user
// @route GET /api/users
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  // console.log(user);
  res.status(200).json(user);
});

// @desc  Post user
// @route POST /api/users
const setUser = asyncHandler(async (req, res) => {
  if (!req.body.login || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please add all data");
  }
  const user = await User.create(req.body);
  console.log(user);

  res.status(200).json(user);
});

// @desc  Update user
// @route PUT /api/users
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// @desc  Delete user
// @route DELETE /api/users
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser,
};
