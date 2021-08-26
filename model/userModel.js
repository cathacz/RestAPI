const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: [true, "Sorry, I didn't get your name"],
    unique: true,
  },
  userPass: {
    type: String,
    trim: true,
    required: [true, "You need a password to protect you"],
  },
  age: {
    type: Number,
    required: [true, "I really need to know your age"],
  },
  fbw: {
    type: Number,
    required: [true, "Are we in the same class?"],
  },
  eMail: {
    type: String,
    trim: true,
    required: [true, "Don't you wanna be my penfriend?"],
    unique: true,
  },
  toolStack: {
    type: Array,
    // trim: true,
  },
});
module.exports = mongoose.model("UserData", userDataSchema);
