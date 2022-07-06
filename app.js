const express = require("express");
const app = express();
const port = 3003;
const middleware = require("./middleware");
const path = require("path");
const database = require("./db/database");
const session = require("express-session");

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "bbq chips",
        resave: true,
        saveUninitialized: false,
    })
);

// Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute)

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
    };

    res.status(200).render("home", payload);
});
