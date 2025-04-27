const {
  createBooking,
  getAllBookings,
  getBookingById,
  removeBookingById,
  updateBookingById,
} = require("../controllers/booking.controller");

const router = require("express").Router();

router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.get("/:id", getBookingById);
router.delete("/:id", removeBookingById);
router.patch("/:id", updateBookingById);

module.exports = router;
