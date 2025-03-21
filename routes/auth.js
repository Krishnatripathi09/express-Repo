const express = require("express");
const { User } = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const authRouter = express.Router();
const app = express();
app.use(cookieparser());

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();

    res.send("Data Saved SuccessFully");
  } catch (err) {
    res.status(400).send("Error Occured --> " + err);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).send("User Not Found");
  }

  const passwordValid = await user.verifyPWD(password);
  if (passwordValid) {
    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
      httpOnly: true,
    });
    res.status(200).send("Logged-In Sucessfully");
  } else {
    res.status(400).send("Please Enter Valid Credentials");
  }
});

module.exports = {
  authRouter,
};
