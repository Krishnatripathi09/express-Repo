const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth, passwordAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateSignUpData,
} = require("../utils/validation");
const validator = require("validator");
const profileRouter = express.Router();

profileRouter.get("/user", userAuth, (req, res) => {
  const user = req.user;

  res.send("Logged In User is " + user);
});

profileRouter.patch("/user/editProfile", userAuth, async (req, res) => {
  if (!validateEditProfileData(req)) {
    res.status(400).send("Edit not allowed on this field");
  }

  const loggedInUser = req.user;

  Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

  await loggedInUser.save();

  res.json({ messgae: `${loggedInUser.firstName}`, data: loggedInUser });
});

profileRouter.patch("/user/updatePassword", passwordAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const loggedInUser = req.user;

  if (!oldPassword || !newPassword) {
    res.send("Please Enter Old and New Passwords");
  } else if (!validator.isStrongPassword(newPassword)) {
    res.send("Please Enter Strong New Password");
  }

  const isMatch = await bcrypt.compare(oldPassword, loggedInUser.password);

  if (!isMatch) {
    res.send("Old-Password is not Correct");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  loggedInUser.password = hashedPassword;
  await loggedInUser.save();

  res.status(200).send("Password Updated SuccessFully");
});

module.exports = {
  profileRouter,
};
