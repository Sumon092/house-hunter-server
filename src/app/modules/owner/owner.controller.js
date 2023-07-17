const userService = require("../users/user.services");
const houseService = require("./owner.services");

async function addHouse(req, res) {
  try {
    const houseData = req.body;
    const userId = req.user._id;

    // const house = await houseService.addHouseService(houseData);
    const house = await houseService.addHouseService(houseData, userId);

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
    res.status(500).json({ message: "Failed to get houses" });
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
module.exports = {
  addHouse,
  getAllHouses,
  updateHouse,
};
