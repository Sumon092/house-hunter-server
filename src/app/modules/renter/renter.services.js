const House = require("../owner/owner.model.js");
const Booking = require("./renter.model.js");

async function createBooking(bookingData) {
  try {
    const { houseRenterId, houseId } = bookingData;
    const bookingCount = await Booking.countDocuments({ houseRenterId });
    if (bookingCount >= 2) {
      throw new Error("Maximum booking limit reached");
    }
    const house = await House.findByIdAndUpdate(houseId, {
      booked: true,
      houseRenter: houseRenterId,
    });
    if (!house) {
      throw new Error("House not found");
    }

    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw new Error("Failed to create booking");
  }
}

module.exports = { createBooking };
