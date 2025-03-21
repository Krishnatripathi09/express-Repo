const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).send("Please Log-In Again");
    }

    const decodedMsg = await jwt.verify(token, "MysecretdKey");
    const { id } = decodedMsg;
    console.log(id);

    const user = await User.findById(id);
    console.log(user);

    if (!user) {
      res.status(401).send("Please Log-In Again");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("Please Log-In Again");
  }
};

module.exports = {
  userAuth,
};
