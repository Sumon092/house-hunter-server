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
module.exports = {
  addHouse,
  getAllHouses,
};
