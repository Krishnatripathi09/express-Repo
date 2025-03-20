const express = require("express");
const { adminAuth } = require("../middlewares/auth");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});

app.get("/user/:userId", adminAuth, (req, res) => {
  const query = req.params.userId;
  console.log(query);
  res.send("I am get Route");
});
