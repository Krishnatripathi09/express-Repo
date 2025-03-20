const express = require("express");
const { adminAuth } = require("../middlewares/auth");
const { connectDB } = require("../config/database");

const app = express();

const PORT = 3000;
connectDB()
  .then(() => {
    console.log("Connection to Data-Base is Success-Full");
    app.listen(PORT, () => {
      console.log(`Server is started on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/user/:userId", adminAuth, (req, res) => {
  const query = req.params.userId;
  console.log(query);
  res.send("I am get Route");
});
