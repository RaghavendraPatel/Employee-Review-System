// import and create express server
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
//import database connection
const db = require("./config/mongoose");
//import exopress session for session cookie
const session = require("express-session");
//import passport for authentication
const passport = require("passport");
//import passport local strategy
const passportLocal = require("./config/passport-local-strategy");

//import dotenv for environment variables
const dotenv = require("dotenv").config();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//configure express session
app.use(
  session({
    name: "user",
    secret: process.env.SESSION_SECRET || "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);
app.enable("trust proxy");
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//import routes
app.use("/", require("./routes"));

//listen to port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
