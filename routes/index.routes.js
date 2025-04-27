const router = require("express").Router();
const usersRoute = require("./users.routes");
const stadionsRoute = require("./stadion.routes");
const bookingRoute = require("./booking.routes");
const paymnetRoute = require("./payment.routes");
const reviewRoute = require("./review.routes");
const imagesRoute = require("./images.routes");

router.use("/users", usersRoute);
router.use("/stadions", stadionsRoute);
router.use("/bookings", bookingRoute);
router.use("/payment", paymnetRoute);
router.use("/reviews", reviewRoute);
router.use("/images", imagesRoute);

module.exports = router;
