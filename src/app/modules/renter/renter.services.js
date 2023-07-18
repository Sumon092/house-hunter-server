const House = require("../owner/owner.model.js");
const Booking = require("./renter.model.js");

async function createBooking(bookingData) {
  try {
    const { houseRenterId, houseId } = bookingData;

    const house = await House.findById(houseId);
    if (!house) {
      throw new Error("This House is not found");
    }

    if (house.booked) {
      throw new Error("House is already booked");
    }

    const bookingCount = await Booking.find({
      houseRenter: houseRenterId,
    }).count();
    if (bookingCount >= 2) {
      throw new Error("Maximum booking limit reached");
    }

    house.booked = true;
    house.houseRenter = houseRenterId;
    await house.save();

    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
}

// remove booking
async function removeBookingService(bookingId) {
  try {
    const booking = await Booking.findById(bookingId).populate("house");

    if (!booking) {
      throw new Error("Booking not found");
    }

    // const { houseId,house } = booking;
    const house = await House.findById(houseId);
    console.log({ house });

    if (!house) {
      throw new Error("Associated house not found");
    }

    house.booked = false;
    house.houseRenter = null;
    await house.save();

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      throw new Error("Failed to delete booking" + error.message);
    }

    return deletedBooking;
  } catch (error) {
    throw new Error("errrr ..." + error.message);
  }
}

module.exports = { createBooking, removeBookingService };
