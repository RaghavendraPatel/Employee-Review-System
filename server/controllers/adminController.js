// Desc: Controller for admin routes

//import user and employee model
const User = require("../models/user");
const Employee = require("../models/employee");

//Desc: Get all employees
//Route: GET /admin/employees
//Access: Only admin can access this route
module.exports.getEmployees = async function (req, res) {
  try {
    //find all employees and return only name and email
    let empArr = [];
    const employees = await Employee.find()
      .select({
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      })
      .populate("pending_reviews", "name email")
      .populate("reviews");

    for (let i = 0; i < employees.length; i++) {
      const user = await User.findOne({ email: employees[i].email }).select({
        id: 1,
        role: 1,
      });
      empArr.push({
        ...employees[i]._doc,
        userid: user.id,
        role: user.role,
      });
    }
    return res.status(200).json({
      message: "Employees fetched successfully",
      data: {
        employees: empArr,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot fetch employees",
    });
  }
};

//Desc: Promote user to admin
//Route: GET /admin/promote/:id
//Access: Only admin can access this route
module.exports.promote = async function (req, res) {
  try {
    //find user by id
    const user = await User.findById(req.params.id);
    //if user not found return 404
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //promote user to admin
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

//Desc: Demote user to employee
//Route: GET /admin/demote/:id
//Access: Only admin can access this route
module.exports.demote = async function (req, res) {
  try {
    //find user by id
    const user = await User.findById(req.params.id);
    //if user not found return 404
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //demote user to employee
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

//Desc: Remove user
//Route: GET /admin/remove/:id
//Access: Only admin can access this route
module.exports.remove = async function (req, res) {
  try {
    console.log(req.params.id);
    //find user by id
    const user = await User.findById(req.params.id);
    //if user not found return 404
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //remove user
    const employee = await Employee.findOne({ email: user.email });
    console.log(employee._id);
    // const employeeWithPendingReviews = await Employee.find({
    //   pending_reviews: employee._id,
    // });
    const employeeWithPendingReviews = await Employee.find();
    console.log(employeeWithPendingReviews.length);
    employeeWithPendingReviews.forEach((emp) => {
      if (emp.pending_reviews.includes(employee._id)) {
        emp.pending_reviews.pull(employee._id);
      }
      emp.save();
    });

    await Employee.findByIdAndDelete(employee.id);
    await User.findByIdAndDelete(user.id);

    return res.status(200).json({
      message: "User removed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot remove user",
    });
  }
};

//Desc: Assign task to employee
//Route: POST /admin/assign
//Access: Only admin can access this route
module.exports.assign = async function (req, res) {
  try {
    const from = req.body.from;
    const to = req.body.to;
    if (!from || !to) {
      //if from or to is not provided return 400
      return res.status(400).json({
        message: "Please enter both Reviewer and Reviewee email",
      });
    } else if (from === to) {
      //if from and to are same return 400
      return res.status(400).json({
        message: "Reviewer and Reviewee cannot be same",
      });
    } else {
      //find reviewer and reviewee by email
      const reviewer = await Employee.findById(from);
      const reviewee = await Employee.findById(to);
      if (!reviewer || !reviewee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
      //if reviewer already has pending review for reviewee return 400
      if (reviewer.pending_reviews.includes(reviewee.id)) {
        return res.status(400).json({
          message: "Task already assigned",
        });
      }
      //assign task to reviewer
      reviewer.pending_reviews.push(reviewee.id);
      await reviewer.save();
      return res.status(200).json({
        message: "Task assigned successfully",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot assign task",
    });
  }
};

//Desc: Edit employee details
//Route: POST /admin/edit
//Access: Only admin can access this route
module.exports.editEmployee = async function (req, res) {
  const { name, email, role, userid, empid } = req.body;
  try {
    //find user by id
    const user = await User.findById(userid);
    //if user not found return 404
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //find employee by id
    const employee = await Employee.findById(empid);
    //if employee not found return 404
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    //if email is changed
    if (user.email !== email) {
      //check if new email already exists
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
      //update email in user and employee collection
      user.email = email;
      employee.email = email;
    }
    //update name and role in employee and user collection
    employee.name = name;
    user.name = name;
    user.role = role;
    await user.save();
    await employee.save();
    return res.status(200).json({
      message: "Employee details updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot update employee details",
    });
  }
};
