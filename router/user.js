const express = require("express");
const router = express.Router();
const UserData = require("../model/userModel");
const {
  getUser,
  getAllUser,
  addNewUser,
} = require("../controllers/userController");

router.route("/").get(getAllUser).post(addNewUser);

router.route("/:userName").get(getUser);

module.exports = router;
