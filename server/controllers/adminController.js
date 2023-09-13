const User = require("../models/user");

module.exports.promote = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.role = "admin";
    await user.save();
    return res.status(200).json({
      message: "User promoted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot promote user",
    });
  }
};

module.exports.demote = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.role = "employee";
    await user.save();
    return res.status(200).json({
      message: "User demoted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot demote user",
    });
  }
};
