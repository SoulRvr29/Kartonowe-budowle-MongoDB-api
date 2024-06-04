const express = require("express");
const router = express.Router();
const {
  getComment,
  setComment,
  updateComment,
  deleteComment,
  likeComment,
} = require("../controllers/commentController");

router.route("/:sectionId/like").put(likeComment);
router.route("/").get(getComment).post(setComment);
router.route("/:id").put(updateComment).delete(deleteComment);

module.exports = router;
