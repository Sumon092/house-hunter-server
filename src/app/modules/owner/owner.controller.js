const userService = require("../users/user.services");
const { addHouseService } = require("./owner.services.js");

async function addHouse(req, res) {
  try {
    const houseData = req.body;
    // const userId = req.user._id;

    const house = await addHouseService(houseData);
    // const house = await addHouseService(houseData, userId);

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

module.exports = {
  addHouse,
};
