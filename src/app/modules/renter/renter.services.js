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

const cancelBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};
const getHouseByBookingId = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId).exec();
    console.log("booking is ", booking.houseId);
    if (!booking) {
      return null;
    }
    return booking.houseId;
  } catch (error) {
    throw new Error("Failed to get house by booking ID");
  }
};
const getAllBookingsByHouseRenter = async (houseRenterId) => {
  try {
    const bookings = await Booking.find({ houseRenterId }).exec();
    console.log(bookings, "house booking");

    return bookings;
  } catch (error) {
    throw new Error("Failed to get bookings by houseRenter: " + error.message);
  }
};

module.exports = {
  createBooking,
  cancelBooking,
  getHouseByBookingId,
  getAllBookingsByHouseRenter,
};
