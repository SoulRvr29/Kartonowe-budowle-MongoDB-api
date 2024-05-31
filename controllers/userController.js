const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const argon2 = require("argon2");

// @desc  Get user
// @route GET /api/users
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  console.log(user);
  res.status(200).json(user);
});

// @desc  Post user
// @route POST /api/users
const setUser = asyncHandler(async (req, res) => {
  if (!req.body.login || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please add all data");
  }
  const loginExist = await User.findOne({
    login: req.body.login,
  });
  if (loginExist) {
    res.status(400);
    throw new Error("Login already exist");
  }

  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  const hashedPass = await hashPassword(req.body.password);
  const user = await User.create({ ...req.body, password: hashedPass });

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
  let updatedUser = {};
  if (req.body.password) {
    const hashedPass = await hashPassword(req.body.password);
    updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, password: hashedPass },
      {
        new: true,
      }
    );
  } else {
    updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }

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

///// PASSWORD VERIFICATION /////
const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    throw new Error("Password hashing failed");
  }
};

const verifyPassword = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    throw new Error("Password verify failed");
  }
};

// @desc  Get verify
// @route GET /api/users/verify
const loginVerify = asyncHandler(async (req, res) => {
  const data = await User.find({ login: req.body.login });
  let verify = false;
  if (data.length) {
    verify = await verifyPassword(data[0].password, req.body.password);
  } else {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json({
    login: data[0].login,
    email: data[0].email,
    password: req.body.password,
    verify: verify,
    admin: data[0].admin,
  });
});

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser,
  loginVerify,
};
