const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "GOCSPX-YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:5000/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return done(err, profile);
      // Create or find user in the database with Google ID here
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
