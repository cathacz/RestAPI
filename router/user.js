const express = require("express");
const router = express.Router();
const UserData = require("../model/userModel");
const {
  getUser,
  getOneUser,
  getAllUser,
  addNewUser,
  updateUser,
  updateUserPart,
} = require("../controllers/userController");

router.route("/").get(getAllUser).post(addNewUser);

router
  .route("/:userName")
  .get(getUser, getOneUser)
  .put(getUser, updateUser)
  .patch(getUser, updateUserPart);

router.get("/display/:userName", getUser, (req, res) => {
  res.status(200).json(res.user);
});

module.exports = router;
