const { default: mongoose } = require("mongoose");
const userService = require("../users/user.services");
const houseService = require("./owner.services");

async function addHouse(req, res) {
  try {
    const houseData = req.body;
    const ownerId = req.user.userId;
    const objectId = new mongoose.Types.ObjectId(ownerId);
    const house = await houseService.addHouseService(houseData, objectId);
    res.json({
      status: 200,
      message: "House added successfully",
      success: true,
      data: house,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// get all house
const getAllHouses = async (req, res) => {
  try {
    const houses = await houseService.getAllHouses();
    res.json({ houses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get houses", error: error.message });
  }
};

// update house info
const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedHouse = await houseService.updateHouse(id, updatedData);
    res.json({
      status: 200,
      success: true,
      message: "House updated successfully",
      house: updatedHouse,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to edit the house" });
  }
};
// delete house controller
const deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    await houseService.deleteHouse(id);
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the house" });
  }
};
//get paginated house
const getHouses = async (req, res) => {
  try {
    const {
      city,
      bedrooms,
      bathrooms,
      roomSize,
      availability,
      minRent,
      maxRent,
    } = req.query;
    const filters = {};

    if (city) {
      filters.city = { $regex: new RegExp(city, "i") };
    }
    if (bedrooms) {
      filters.bedrooms = bedrooms;
    }
    if (bathrooms) {
      filters.bathrooms = bathrooms;
    }
    if (roomSize) {
      filters.roomSize = roomSize;
    }
    if (availability) {
      filters.availability = availability;
    }
    if (minRent && maxRent) {
      filters.rentPerMonth = { $gte: minRent, $lte: maxRent };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const houses = await houseService.searchHouses(filters, page, limit);

    res.json(houses);
  } catch (error) {
    console.error("Failed to fetch houses:", error);
    res.status(500).json({ error: "Failed to fetch houses" });
  }
};
const saveHouse = async (req, res) => {
  const houseData = req.body;
  const ownerId = req.user.id; 
  try {
    const savedHouse = await houseService.saveHouse(houseData, ownerId);
    res.status(201).json(savedHouse);
  } catch (error) {
    res.status(500).json({ message: "Failed to save house data" });
  }
};
const getHousesByOwner = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const houses = await houseService.getHousesByOwner(ownerId);
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: "Failed to get houses by owner" });
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  updateHouse,
  deleteHouse,
  getHouses,
  saveHouse,
  getHousesByOwner,
};
