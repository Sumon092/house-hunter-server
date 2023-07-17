const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

// login service
async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
  console.log({ token });
  return token;
}

module.exports = {
  createUser,
  loginUser,
};
