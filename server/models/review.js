const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    punctuality: {
      type: Number,
      max: 5,
      required: true,
    },
    work_ethics: {
      type: Number,
      max: 5,
      required: true,
    },
    behavior: {
      type: Number,
      max: 5,
      required: true,
    },
    overall_rating: {
      type: Number,
      max: 5,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
