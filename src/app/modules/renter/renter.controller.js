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

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//remove booking
async function removeBookingController(req, res) {
  try {
    const { bookingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid bookingId");
    }
    const deletedBooking = await bookingServices.removeBookingService(
      bookingId
    );

    res.json({
      success: true,
      message: "Booking removed",
      delete: deletedBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getBookedHouse = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to get bookings" });
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

    // Fetch the house data using the House model
    const house = await House.findById(houseId).exec();
    console.log(house, "house is house");

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    res.json(house); // Send the house data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get house by booking ID" });
  }
};
const getAllBookingsByHouseRenterController = async (req, res) => {
  try {
    console.log("User", req.user);
    const houseRenterId = req.user.userId;
    console.log(houseRenterId, "house renter user");
    const bookings = await bookingServices.getAllBookingsByHouseRenter(
      houseRenterId
    );
    console.log(bookings, "from controller");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  removeBookingController,
  getHouseByBookingIdController,
  getAllBookingsByHouseRenterController,
};
