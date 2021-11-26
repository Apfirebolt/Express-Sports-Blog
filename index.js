const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const { connectDB } = require("./config/db.js");

dotenv.config();
const app = express();
connectDB();

// Passport Config
require('./config/passport')(passport);

// ejs template engine
app.set("view engine", "ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

const MongoDBStore = require("connect-mongodb-session")(session);

// Sessions to be stored in mongodb database
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// Express session middleware
app.use(
  session({
    secret: "app_secret",
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    store: store /* store session data in mongodb */,
    cookie: { path: "/", httpOnly: true, maxAge: 36000000 },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Set media folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Index Route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("pages/index", {
    title: title,
  });
});

// About Route
app.get("/about", (req, res) => {
  res.render("pages/about");
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
