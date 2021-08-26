const UserData = require("../model/userModel");
const express = require("express");

// Middleware – show all Users
const getAllUser = async (req, res) => {
  try {
    const user = await UserData.find();
    // 200 for Successful Ok
    res.status(200).json(
      user.map((user) => {
        return {
          Name: user.userName,
          age: user.age,
          toolStack: user.toolStack,
          request: {
            type: "GET",
            url: `http://localhost:5000/user/${user.userName}`,
          },
        };
      })
    );
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: "There are no Users!" });
  }
};

// Middleware – add new User to DataBase
const addNewUser = async (req, res) => {
  const user = new UserData({
    userName: req.body.userName,
    userPass: req.body.userPass,
    age: req.body.age,
    fbw: req.body.fbw,
    eMail: req.body.eMail,
    toolStack: req.body.toolStack,
  });

  // EXAMPLE:
  // {
  //   "userName": "Catha",
  //   "userPass": "123pass",
  //   "age": 32,
  //   "fbw": 48,
  //   "toolStack": ["Js", "Html5", "Css3", "Sass"],
  //   "eMail": "contact@cath.at"
  // }
  try {
    // save
    const newUser = await user.save();
    // 201 for Successful Created
    res.status(201).json(`I just added: ${newUser}`);
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({
      message: err.message,
    });
  }
};

// Middleware – get User by name
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await UserData.findOne({ name: req.params.userName });
    console.log(user);
    if (user == null) {
      // Not found
      return res
        .status(404)
        .json({ message: "Sorry, I can't find that user." });
    }
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

module.exports = {
  getUser,
  getAllUser,
  addNewUser,
};
