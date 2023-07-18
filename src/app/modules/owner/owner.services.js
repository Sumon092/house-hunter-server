const mongoose = require("mongoose");
const User = require("../users/user.model.js");
const House = require("./owner.model.js");

async function addHouseService(houseData, userId) {
  const house = new House(houseData);
  await house.save();
  const objectId = new mongoose.Types.ObjectId(userId);
  await User.findByIdAndUpdate(objectId, {
    $push: { ownedHouses: house._id },
  });
  const populatedHouse = await House.findById(house._id).populate(
    "ownedHouses"
  );
  return populatedHouse;
}
//get paginated house
const searchHouses = async (filters, page, limit) => {
  try {
    const skip = (page - 1) * limit;

    const houses = await House.find(filters)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    return houses;
  } catch (error) {
    throw new Error("Failed to fetch houses");
  }
};

// get All house by owner
async function getAllHouses() {
  try {
    return await House.find().populate("ownedHouses");
  } catch (error) {
    throw new Error("Failed to get houses: " + error.message);
  }
}

// update house service
const updateHouse = async (id, updatedData) => {
  return await House.findByIdAndUpdate(id, updatedData, { new: true });
};

// delete house service
const deleteHouse = async (id) => {
  return await House.findByIdAndDelete(id);
};

const saveHouse = async (houseData, ownerId) => {
  try {
    const owner = await User.findById(ownerId);
    const newHouse = new House({
      ...houseData,
      owner: ownerId,
    });
    const savedHouse = await newHouse.save();
    owner.ownedHouses.push(savedHouse);
    await owner.save();

    return savedHouse;
  } catch (error) {
    throw new Error("Failed to save house data");
  }
};
const getHousesByOwner = async (ownerId) => {
  try {
    const houses = await House.find({ owner: ownerId }).populate("owner");
    return houses;
  } catch (error) {
    throw new Error("Failed to get houses by owner");
  }
};

module.exports = {
  addHouseService,
  getAllHouses,
  updateHouse,
  deleteHouse,
  searchHouses,
  saveHouse,
  getHousesByOwner
};
