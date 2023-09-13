const exopress = require("express");
const router = exopress.Router();

const passport = require("passport");

const adminController = require("../controllers/adminController");

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

module.exports = router;
