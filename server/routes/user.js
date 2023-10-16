// Desc: user routes
// Access: All users can access these routes
// Actions: Create user, login, logout
// Author: Raghavendra Patel
const express = require("express");
const router = express.Router();
//import passport for authentication
const passport = require("passport");
//import userController for user routes actions
const userController = require("../controllers/userController");

//routes for user actions

//create user
router.post("/create", userController.create);
//login user
router.post(
  "/create-session",
  passport.authenticate("local"),
  userController.createSession
);
//logout user
router.get(
  "/destroy-session",
  passport.checkAuthentication,
  userController.destroySession
);

module.exports = router;
