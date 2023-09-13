// Initialize Mongoose
const mongoose = require("mongoose");
// import dotenv for environment variables
const dotenv = require("dotenv").config();
// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/employee_review"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
