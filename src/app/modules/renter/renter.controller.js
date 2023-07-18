const { default: mongoose } = require("mongoose");
const bookingServices = require("./renter.services");

async function createBooking(req, res) {
  try {
    const { name, email, phoneNumber, houseRenterId, houseId } = req.body;

    const houseRentObjectId = new mongoose.Types.ObjectId(houseRenterId);
    const houseIdObjectId = new mongoose.Types.ObjectId(houseId);
    console.log(name, email, phoneNumber, houseRentObjectId, houseIdObjectId);
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

module.exports = { createBooking };
