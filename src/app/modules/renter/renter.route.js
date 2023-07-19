const express = require("express");
const verifyToken = require("../../middleware/verifyToken.js");
const bookingController = require("./renter.controller");

const router = express.Router();

router.delete(
  "/removeBooking/:bookingId",
  bookingController.removeBookingController
);
router.post("/addBooking", verifyToken, bookingController.createBooking);
router.get(
  "/booked/:bookingId",
  bookingController.getHouseByBookingIdController
);
router.get(
  "/booked",
  verifyToken,
  bookingController.getAllBookingsByHouseRenterController
);

module.exports = router;
