const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin"));
// router.use("/employee", require("./employee"));
router.use("/user", require("./user"));
// router.use("/review", require("./review"));

module.exports = router;
