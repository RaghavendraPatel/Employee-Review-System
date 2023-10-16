const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// GET review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.json(review);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// UPDATE review by ID
router.put("/:id", async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review = await Review.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.json(review);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
