// Desc: Admin routes
// Access: Only admin can access these routes
// Actions: Promote, demote, remove users and assign tasks
// Author: Raghavendra Patel
const exopress = require("express");
const router = exopress.Router();
//import passport for authentication
const passport = require("passport");
//import adminController for admin routes actions
const adminController = require("../controllers/adminController");

//routes for admin actions

//promote user to admin
router.get(
  "/promote/:id",
  (req, res, next) => {
    req.session.passport.user.role == "admin"
      ? next()
      : res.status(401).json({
          message: "Unauthorized, Only admin can promote users",
        });
  },
  adminController.promote
);

//demote user to employee
router.get(
  "/demote/:id",
  (req, res, next) => {
    req.session.passport.user.role == "admin"
      ? next()
      : res.status(401).json({
          message: "Unauthorized",
        });
  },
  adminController.demote
);

//remove user
router.get(
  "/remove/:id",
  (req, res, next) => {
    req.session.passport.user.role == "admin"
      ? next()
      : res.status(401).json({
          message: "Unauthorized, Only admin can remove users",
        });
  },
  adminController.remove
);

//assign task to employee
router.post(
  "/assign",
  (req, res, next) => {
    req.session.passport.user.role == "admin"
      ? next()
      : res.status(401).json({
          message: "Unauthorized, Only admin can assign tasks",
        });
  },
  adminController.assign
);

// get all employees
router.get(
  "/employees",
  (req, res, next) => {
    req.session.passport.user.role == "admin"
      ? next()
      : res.status(401).json({
          message: "Unauthorized, Only admin can view employees",
        });
  },
  adminController.getEmployees
);

// edit employee details
router.post(
  "/edit",
  (req, res, next) => {
    req.session.passport.user.role == "admin"
      ? next()
      : res.status(401).json({
          message: "Unauthorized, Only admin can edit employees",
        });
  },
  adminController.editEmployee
);

module.exports = router;
