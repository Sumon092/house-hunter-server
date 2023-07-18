const { default: mongoose } = require("mongoose");
const bookingServices = require("./renter.services");
const Booking = require("./renter.model");

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


module.exports = { createBooking, removeBookingController };
