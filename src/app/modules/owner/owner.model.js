const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  roomSize: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  availabilityDate: {
    type: Date,
    required: true,
  },
  rentPerMonth: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(\+?88)?01[0-9]{9}$/.test(value);
      },
      message: "Please provide a valid Bangladeshi phone number",
    },
  },
  description: {
    type: String,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  ownedHouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  houseRenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HouseRenter",
  },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
