const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Log-In Again");
    }

    const decodedMsg = await jwt.verify(token, "MySecretKey");
    const { id } = decodedMsg;

    const user = await User.findById(id).select("firstName lastName email");

    if (!user) {
      res.status(401).send("Please Log-In Again");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("Error Occured " + err);
  }
};

const passwordAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send("Un-Authorized request Please Log-In Again");
  }

  const fetchUser = await jwt.verify(token, "MySecretKey");

  const { id } = fetchUser;

  const user = await User.findById(id).select("firstName lastName password");
  if (!user) {
    res.status(404).send("User Not Found :(");
  }

  req.user = user;
  next();
};

module.exports = {
  userAuth,
  passwordAuth,
};
