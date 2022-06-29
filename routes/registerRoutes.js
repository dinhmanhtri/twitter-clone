const express = require("express");
const app = express();
const router = express.Router();
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let username = req.body.username.trim();
  let email = req.body.email.trim();
  let password = req.body.password;

  var payload = req.body;

  if (firstName && lastName && username && email && password) {
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("register", payload);
    });

    if (user === null) {
      // No user found
      let data = req.body;
      data.password = await bcrypt.hash(password, 10);
      
      User.create(data).then((user) => {
        console.log(user);
      });
    } else {
      // User found
      if (user === user.email) {
        payload.errorMessage = "Email already in use.";
      } else {
        payload.errorMessage = "Username already in use.";
      }
    }
  } else {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("register", payload);
  }
});
module.exports = router;
