const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter Valid Email ");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Enter Strong Passowrd");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ id: user.id }, "MysecretKey", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.verifyPWD = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const validPWD = await bcrypt.compare(passwordInputByUser, passwordHash);

  return validPWD;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
