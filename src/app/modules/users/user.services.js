const User = require("./user.model");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  try {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
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
    throw new Error("Failed to create user");
  }
}

module.exports = {
  createUser,
};
