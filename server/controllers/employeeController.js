// Desc: Controller for employee routes actions

// //import employee model
const Employee = require("../models/employee");

// //import review model
const Review = require("../models/review");
const User = require("../models/user");

//Desc: View profile
//Route: GET /employee/profile/:id
//Access: Only employee can access this route
module.exports.profile = async function (req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (
      req.session.passport.user.role == "admin" ||
      employee.email == req.session.passport.user.email
    ) {
      //return employee details
      //find employee by id
      const employee = await Employee.findById(req.params.id)
        .select({
          password: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        })
        .populate("reviews");
      console.log(employee.email);
      //if employee not found return 404
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      const user = await User.findOne({ email: employee.email });
      return res.status(200).json({
        message: "Employee details",
        employee: { ...employee._doc, role: user.role },
      });
    } else {
      const employee = await Employee.findById(req.params.id)
        .select({
          password: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          reviewed: 0,
          pending_reviews: 0,
        })
        .populate("reviews", {
          review: 1,
          punctuality: 1,
          work_ethics: 1,
          behavior: 1,
          overall_rating: 1,
          from: 1,
          to: 1,
        });
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
      const user = await User.findOne({ email: employee.email });
      return res.status(200).json({
        message: "Employee details",
        employee: { ...employee._doc, role: user.role },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot fetch employee details",
    });
  }
};

//Desc: View all tasks
//Route: GET /employee/view-tasks
//Access: Only employee can access this route

module.exports.viewTasks = async function (req, res) {
  try {
    //find employee by id
    const employee = await Employee.findOne({
      email: req.session.passport.user.email,
    });
    //if employee not found return 404
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    //return tasks
    return res.status(200).json({
      message: "Tasks",
      tasks: employee.pending_reviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot fetch tasks",
    });
  }
};

//Desc: Create review
//Route: POST /employee/create-review/:id
//Access: Only employee can access this route

module.exports.createReview = async function (req, res) {
  try {
    //find employee by id
    const employee = await Employee.findById(req.body.to);
    const from = await Employee.findById(req.body.from);
    //if employee not found return 404
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    const overall_rating = (
      (Number(req.body.punctuality) +
        Number(req.body.work_ethics) +
        Number(req.body.behavior)) /
      3
    ).toPrecision(2);
    //create review
    const review = await Review.create({
      review: req.body.review,
      punctuality: req.body.punctuality,
      work_ethics: req.body.work_ethics,
      behavior: req.body.behavior,
      overall_rating: overall_rating,
      from: req.body.from,
      to: req.body.to,
    });
    employee.reviews.push(review._id);
    employee.total_reviews += 1;
    employee.rating = (
      (employee.rating * (employee.total_reviews - 1) + review.overall_rating) /
      employee.total_reviews
    ).toPrecision(2);
    //save employee
    employee.save();
    from.reviewed.push({
      user: req.params.id,
      review: review._id,
    });
    from.pending_reviews.pull(req.body.to);
    from.save();
    //return success message
    return res.status(200).json({
      message: "Review created",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error, Cannot create review",
    });
  }
};
