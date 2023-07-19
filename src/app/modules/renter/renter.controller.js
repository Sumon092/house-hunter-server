const { default: mongoose } = require("mongoose");
const bookingServices = require("./renter.services");
const Booking = require("./renter.model");
const House = require("../owner/owner.model");

async function createBooking(req, res) {
  try {
    const { name, email, phoneNumber, houseRenterId, houseId } = req.body;
    const houseRentObjectId = new mongoose.Types.ObjectId(houseRenterId);
    const houseIdObjectId = new mongoose.Types.ObjectId(houseId);
    const bookingData = {
      name,
      email,
      phoneNumber,
      houseRenterId: houseRentObjectId,
      houseId: houseIdObjectId,
    };

    const booking = await bookingServices.createBooking(bookingData);

    res.json({
      status: 200,
      booking,
    });
  } catch (error) {
    res.json({
      status: 500,
      error: error.message,
    });
  }
}
//remove booking
const cancelBookingController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "booking id controller");
    await bookingServices.cancelBooking(id); //
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.json({
      status: 500,
      error: error.message,
    });
  }
};

const getHouseByBookingIdController = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const houseId = await bookingServices.getHouseByBookingId(bookingId);
    if (!houseId) {
      return res
        .status(404)
        .json({ error: "House not found for the given booking ID" });
    }

    const house = await House.findById(houseId).exec();
    console.log(house, "house is house");

    if (!house) {
      return res.json({
        status: 404,
        error: "House not found",
      });
    }

    res.json(house);
  } catch (error) {
    console.error(error);
    res.json({
      status: 500,
      error: "Failed to get house by booking ID",
    });
  }
};
const getAllBookingsByHouseRenterController = async (req, res) => {
  try {
    const houseRenterId = req.user.userId;
    // console.log(houseRenterId, "house renter user");
    const bookings = await bookingServices.getAllBookingsByHouseRenter(
      houseRenterId
    );
    res.json(bookings);
  } catch (error) {
    res.json({
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  cancelBookingController,
  getHouseByBookingIdController,
  getAllBookingsByHouseRenterController,
};
