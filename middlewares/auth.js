const adminAuth = (req, res, next) => {
  let token = "ABC";

  const isAdminAuthorized = token === "ABC";

  if (!isAdminAuthorized) {
    res.status(401).send("Un-Authorized Please Log-In Again");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
