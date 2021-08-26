const UserData = require("../model/userModel");
const express = require("express");

// Middleware – get the One User ✔️
const getOneUser = async (req, res) => {
  res.status(200).json(res.user);
};

// Middleware – show all Users ✔️
const getAllUser = async (req, res) => {
  try {
    const user = await UserData.find();
    res.status(200).json(
      user.map((user) => {
        return {
          Name: user.userName,
          Password: user.userPass,
          FBW: user.fbw,
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

// Middleware – add new User to DataBase ✔️
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
  //   {
  //   "userName": "Catha",
  //   "userPass": "123pass",
  //   "age": 32,
  //   "fbw": 48,
  //   "toolStack": ["Js", "Html5", "Css3", "Sass"],
  //   "eMail": "contact@cath.at"
  //   }
  try {
    const newUser = await user.save();
    // 201 for Successful Created
    res.status(201).json(`I just added: ${newUser}`);
  } catch (err) {
    // 400 Bad request
    res.status(400).json({
      message: err.message,
    });
  }
};

// Middleware – get User by name ✔️
const getUser = async (req, res, next) => {
  console.log();
  let user;
  try {
    user = await UserData.findOne({ userName: req.params.userName });
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

// Middleware – Update (whole) User by name (PUT) ✔️
const updateUser = async (req, res) => {
  try {
    await UserData.updateOne(
      { name: req.params.userName },
      {
        $set: {
          userName: req.body.userName,
          userPass: req.body.userPass,
          age: req.body.age,
          fbw: req.body.fbw,
          eMail: req.body.eMail,
          toolStack: req.body.toolStack,
        },
      }
    );
    // 200 OK
    res.status(200).json({ message: "User is updated" });
  } catch (err) {
    res.status(400).json({ message: "WTF" });
  }
};

// Middleware –  Update parts of an User by name (PATCH) ✔️
const updateUserPart = async (req, res) => {
  const { userName, userPass, age, fbw, eMail, toolStack } = req.body;
  if (userName) {
    res.user.userName = userName;
    res.user.userPass = userPass;
    res.user.age = age;
    res.user.fbw = fbw;
    res.user.eMail = eMail;
    res.user.toolStack = toolStack;
  }
  try {
    await res.user.save();
    res
      .status(200)
      .json({ message: "User received an Update", data: res.employee });
  } catch (err) {
    // 400 Bad request
    res.status(400).json({ message: err.message });
  }
};

// Middleware –  Remove one User with name (DELETE)
const deleteUser = async (req, res) => {
  try {
    // remove
    await res.user.remove();
    // 200 for Successful OK
    res.status(200).json({ message: "User has been removed" });
  } catch (err) {
    // 400 for Internal server error
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getOneUser,
  getUser,
  getAllUser,
  addNewUser,
  updateUser,
  updateUserPart,
  deleteUser,
};
