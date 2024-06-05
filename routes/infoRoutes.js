const express = require("express");
const router = express.Router();
const {
  getData,
  setData,
  updateData,
  deleteData,
} = require("../controllers/infoController");

router.route("/").get(getData).post(setData);
router.route("/:id").put(updateData).delete(deleteData);

module.exports = router;
