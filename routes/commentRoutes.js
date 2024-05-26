const express = require("express");
const router = express.Router();
const {
  getComment,
  setComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.route("/").get(getComment).post(setComment);
router.route("/:id").put(updateComment).delete(deleteComment);

module.exports = router;
