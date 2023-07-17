const House = require("./owner.model.js");
const User = require("../users/user.model.js");

async function addHouseService(houseData, userId) {
  const house = new House(houseData);

  await house.save();

  //   await User.findByIdAndUpdate(userId, {
  //     $push: { ownedHouses: house._id },
  //   });

  return house;
}

module.exports = {
  addHouseService,
};
