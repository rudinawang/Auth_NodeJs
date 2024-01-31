const express = require("express");
const { users } = require("./model/index");
const app = express();
const bcrypt = require("bcryptjs");

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
    password: bcrypt.hashSync(password, 8),
  });
  res.redirect("/login");
});

// login
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //1st step - tyo email vayeko kohi user table ma xa ki xaina check garney

  const userExists = await users.findAll({
    where: {
      email: email,
    },
  });

  if (userExists.length > 0) {
    //2nd step - email check vayo abo password poni check garnu paryo
    const isMatch = bcrypt.compareSync(password, userExists[0].password);
    if (isMatch) {
      res.send("Logged in Successfully");
    } else {
      res.send("Invalid Email or password");
    }
  } else {
    //
    res.send("Invalid Email or password");
  }
});

app.listen(3000, function () {
  console.log("NodeJs project has started at port 3000");
});
