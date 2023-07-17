const { default: mongoose } = require("mongoose");
const userService = require("../users/user.services");
const houseService = require("./owner.services");

async function addHouse(req, res) {
  try {
    const houseData = req.body;
    const ownerId = req.user.userId;
    const objectId = new mongoose.Types.ObjectId(ownerId);
    console.log({ ownerId });
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

module.exports = {
  addHouse,
  getAllHouses,
  updateHouse,
  deleteHouse,
};
