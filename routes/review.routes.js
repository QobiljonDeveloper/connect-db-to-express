const express = require("express");
const {
  createReview,
  getAllReviews,
  getReviewById,
  removeReviewById,
  updateReviewById,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/create", createReview);
router.get("/stadion/:stadion_id", getAllReviews);
router.get("/:id", getReviewById);
router.delete("/:id", removeReviewById);
router.patch("/:id", updateReviewById);

module.exports = router;
