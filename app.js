const express = require("express");
const app = express();

// database Connection
require("./model/index");

app.set("view engine", "ejs");

app.get("/register", (req, res0) => {
  res0.render("register");
});

app.listen(3000, function () {
  console.log("NodeJs project has started at port 3000");
});
