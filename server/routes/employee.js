// Desc: Employee routes
// Access: Only employee can access these routes
// Actions: View, create, update and delete reviews
// Author: Raghavendra Patel
const express = require("express");
const router = express.Router();

const passport = require("passport");

//import employeeController for employee routes actions
const employeeController = require("../controllers/employeeController");

//routes for employee actions

//view profile
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  employeeController.profile
);

//view all tasks
router.get(
  "/view-tasks",
  passport.checkAuthentication,
  employeeController.viewTasks
);

//create review
router.post(
  "/create-review",
  passport.checkAuthentication,
  employeeController.createReview
);

// //update review
// router.post(
//   "/update-review/:id",
//   passport.checkAuthentication,
//   employeeController.updateReview
// );

module.exports = router;
