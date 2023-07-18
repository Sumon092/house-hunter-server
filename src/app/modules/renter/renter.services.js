const House = require("../owner/owner.model.js");
const Booking = require("./renter.model.js");
const User = require("../users/user.model.js");

//*
async function createBooking(bookingData) {
  try {
    const { houseRenterId, houseId } = bookingData;

    const house = await House.findById(houseId);
    if (!house) {
      throw new Error("This House is not found");
    }

    const houseRenter = await User.findById(houseRenterId);

    if (!houseRenter) {
      throw new Error("House Renter not found");
    }

    if (houseRenter.rentedBookingCount >= 2) {
      throw new Error("Maximum booking limit reached");
    }

    house.booked = true;
    house.houseRenter = houseRenterId;
    await house.save();

    houseRenter.rentedBookingCount += 1;
    await houseRenter.save();

    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
}

const cancelBooking = async (id) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      throw new Error("Booking not found");
    }
    const bookedId = deletedBooking.houseId;
    const house = await House.findById(bookedId);
    if (!house) {
      throw new Error("House not found");
    }
    house.booked = false;
    await house.save();

    const user = await User.findById(deletedBooking.houseRenterId);
    if (user.rentedBookingCount > 0) {
      user.rentedBookingCount -= 1;
      await user.save();
    }
    return deletedBooking;
  } catch (error) {
    throw new Error(error.message);
  }
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
