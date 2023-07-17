const User = require("./user.model");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  try {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName: userData.fullName,
      role: userData.role,
      phoneNumber: userData.phoneNumber,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createUser,
};
