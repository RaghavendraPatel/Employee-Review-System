const User = require("../models/user");
const Employee = require("../models/employee");

module.exports.create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    await User.create(req.body);
    await Employee.create({
      name: req.body.name,
      email: req.body.email,
    });
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot create user",
    });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    const id = req.session.passport.user.id;
    const user = await User.findById(id).select({
      name: 1,
      email: 1,
      role: 1,
    });
    return res.status(200).json({
      message: "Sign in successful",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.destroySession = (req, res) => {
  req.logout(() => {
    return res.status(200).json({
      message: "Sign out successful",
    });
  });
};
