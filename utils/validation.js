const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please Enter first and LastName");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstName should be between 4 and 50 Charcters");
  } else if (lastName.length < 4 || lastName.length > 30) {
    throw new Error("LastName should be between 4 and 30 Charcters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please Enter Valid Email");
  } else if (!password) {
    throw new Error("Please Enter a password");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be at least 8 characters, and should include at least one lowercase and special characters"
    );
  }
};
module.exports = {
  validateSignUpData,
};
