const express = require("express");
const verifyToken = require("../../middleware/verifyToken.js");
const bookingController = require("./renter.controller");

const router = express.Router();

router.post("/addBooking", verifyToken, bookingController.createBooking);

module.exports = router;
