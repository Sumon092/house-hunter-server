const House = require("../owner/owner.model.js");
const Booking = require("./renter.model.js");

async function createBooking(bookingData) {
  try {
    const { houseRenter, houseId } = bookingData;
    const bookingCount = await Booking.countDocuments({ houseRenter });
    if (bookingCount >= 2) {
      throw new Error("Maximum booking limit reached");
    }
    await House.findByIdAndUpdate(
      houseId,
      { booked: true, houseRenter },
      { new: true }
    );

    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw new Error("Failed to create booking");
  }
}

module.exports = { createBooking };
