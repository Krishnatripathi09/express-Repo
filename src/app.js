const express = require("express");
const { adminAuth } = require("../middlewares/auth");
const { connectDB } = require("../config/database");
const { router } = require("../routes/auth");
const cookieparser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use("/", router);

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
