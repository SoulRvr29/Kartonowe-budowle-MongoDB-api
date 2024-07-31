const asyncHandler = require("express-async-handler");

const Info = require("../models/infoModel");
const { text } = require("body-parser");

// @desc  Get data
// @route GET /api/info
const getData = asyncHandler(async (req, res) => {
  const data = await Info.find();
  res.status(200).json(data);
});

// @desc  Post data
// @route POST /api/info
const setData = asyncHandler(async (req, res) => {
  // if (!req.body.title) {
  //   res.status(400);
  //   throw new Error("Please add a title");
  // }
  const data = await Info.create(req.body);

  res.status(200).json(data);
});

// @desc  Update data
// @route PUT /api/info
const updateData = asyncHandler(async (req, res) => {
  const data = await Info.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error("Data not found");
  }
  const updatedData = await Info.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedData);
});

// @desc  Delete data
// @route DELETE /api/info
const deleteData = asyncHandler(async (req, res) => {
  const data = await Info.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error("Data not found");
  }

  await data.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getData,
  setData,
  updateData,
  deleteData,
};
