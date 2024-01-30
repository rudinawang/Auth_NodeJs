const express = require("express");
const { users } = require("./model/index");
const app = express();

// database Connection
require("./model/index");

app.set("view engine", "ejs");

//form batw aako data parse gar or buj hai vanna paryo hai
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res0) => {
  res0.render("register");
});

// post api for handling user registration
app.post("/register", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (!email || !username || !password) {
    res.send("Please enter all the fields");
  }

  await users.create({
    email: email,
    username: username,
    password: password,
  });
  res.send("User registered successfully");
});

app.listen(3000, function () {
  console.log("NodeJs project has started at port 3000");
});
