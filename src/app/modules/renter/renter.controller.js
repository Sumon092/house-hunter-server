const bookingServices = require("./renter.services");

async function createBooking(req, res) {
  try {
    const { name, email, phoneNumber, houseRenterId } = req.body;
    const bookingData = {
      name,
      email,
      phoneNumber,
      houseRenter: houseRenterId,
    };

    const booking = await bookingServices.createBooking(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createBooking };
