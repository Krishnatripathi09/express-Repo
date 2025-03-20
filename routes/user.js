const express = require("express");
const { User } = require("../models/user");
const app = express();

const user = app.post("/user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = await User({
    firstName,
    lastName,
    email,
    password,
  });
  await data.save();

  res.send("Data Saved SuccessFully");
});

app.get("/user", async (req, res) => {
  const user = await User.findOneAndDelete();

  res.status(200).send("Found Users --->" + user);
});

module.exports = {
  user,
};
