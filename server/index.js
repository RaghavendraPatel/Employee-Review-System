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
//set up cors to allow us to accept requests from our client
const cors = require("cors");
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
//configure express session
app.use(
  session({
    name: "user", //name of the cookie
    secret: process.env.SESSION_SECRET || "secret", //encryption key
    saveUninitialized: false, //if user is not logged in, do not save the session
    resave: false,
    cookie: {
      // sameSite: "lax",
      sameSite: "none",
      secure: true,
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
