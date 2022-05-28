const express = require("express");
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", (req, res, next) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let username = req.body.username.trim();
  let email = req.body.email.trim();
  let password = req.body.password;

  var payload = req.body;

  if (firstName && lastName && username && email && password) {
  } else {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("register", payload);
  }
});
module.exports = router;
