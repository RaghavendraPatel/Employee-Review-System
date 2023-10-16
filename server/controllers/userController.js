// Desc: Controller for user

//import user and employee model
const User = require("../models/user");
const Employee = require("../models/employee");

//Desc: Create user
//Route: POST /user/create
//Access: All users can access this route
module.exports.create = async (req, res) => {
  try {
    //check if user already exists
    let user = await User.findOne({ email: req.body.email });
    //if user exists return 400
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //create user in both user and employee collection
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

//Desc: Create session
//Route: POST /user/create-session
//Access: All users can access this route
module.exports.createSession = async (req, res) => {
  try {
    //find user by id and return only name, email and role
    const id = req.session.passport.user.id;
    const user = await User.findById(id).select({
      name: 1,
      email: 1,
      role: 1,
    });
    const employeeId = await Employee.findOne({ email: user.email }).select({
      _id: 1,
    });
    return res.status(200).json({
      message: "Sign in successful",
      data: {
        userid: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: employeeId._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Desc: Destroy session
//Route: GET /user/destroy-session
//Access: All users can access this route
module.exports.destroySession = (req, res) => {
  //logout user
  req.logout(() => {
    return res.status(200).json({
      message: "Sign out successful",
    });
  });
};
