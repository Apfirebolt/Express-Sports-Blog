const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db.js");

const app = express();

// Load routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/blog');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

// Passport Config
require('./config/passport')(passport);
require('./config/google-passport');

dotenv.config();
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
connectDB();

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

// Check user logged in
const checkAuth = (req, res, next) => {
  console.log(req.user)
  req.user ? next() : res.sendStatus(401);
}

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

// Authenticate using Google
app.get("/google", passport.authenticate('google', { scope: ['email', 'profile'] }))
app.get("/google/callback", (req, res) => {
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failed'
  })

})

app.get("/auth/failed", (req, res) => {
  res.send('Google auth failed');
})

app.get("/protected", checkAuth, (req, res) => {
  res.send('Inside protected route')
})

// Use routes
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);
app.use('/users', userRoutes);

app.use((error, req, res, next) => {
  res.render("pages/error", {
    message: error.message,
  });
})

app.get('*', (req, res) => {
  res.render("pages/notFound");
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports.app = app;