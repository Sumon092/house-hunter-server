const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["House Owner", "House Renter"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ownedHouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }],
  rentedHouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }],
  rentedBookingCount: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
