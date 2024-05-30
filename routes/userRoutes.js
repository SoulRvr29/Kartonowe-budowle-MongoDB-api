const express = require("express");
const router = express.Router();
const {
  getUser,
  setUser,
  updateUser,
  deleteUser,
  loginVerify,
} = require("../controllers/userController");

router.route("/").get(getUser).post(setUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/verify").get(loginVerify);

module.exports = router;
