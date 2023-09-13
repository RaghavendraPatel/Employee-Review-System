const express = require("express");
const router = express.Router();

const passport = require("passport");

const userController = require("../controllers/userController");

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local"),
  userController.createSession
);

router.get(
  "/destroy-session",
  passport.checkAuthentication,
  userController.destroySession
);

module.exports = router;
