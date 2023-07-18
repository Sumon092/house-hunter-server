const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  houseRenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HouseRenter",
    default: null,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
