const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user --> Passport");
          return done(err);
        });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, {
    id: user._id,
    role: user.role,
    email: user.email,
  });
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (user, done) {
  User.findById(user.id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding user --> Passport");
      return done(err);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.status(401).json({
    message: "Unauthorized",
  });
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
