const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/test", (req, res) => {
  res.send("This is Test ROute");
});

app.use("/hello", (req, res) => {
  res.send("This is Hello Route");
});
