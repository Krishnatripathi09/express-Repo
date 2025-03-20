const express = require("express");
const { adminAuth } = require("../middlewares/auth");
const { connectDB } = require("../config/database");
const { user } = require("../routes/user");

const app = express();
app.use(express.json());
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

app.use("/", user);
