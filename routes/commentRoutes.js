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
router.route("/").get(getComment);
router.route("/:id").put(setComment);
router.route("/:id/update").put(updateComment);
router.route("/:id").delete(deleteComment);

module.exports = router;
