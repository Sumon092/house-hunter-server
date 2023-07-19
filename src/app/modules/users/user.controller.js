const userService = require("./user.services");

// register user
async function registerUser(req, res) {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.json({
      status: 200,
      message: "User Created Successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

// login user
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, role } = await userService.loginUser(email, password);

    res.json({
      status: 200,
      success: true,
      message: "Login successful",
      token,
      role,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

//get user
const getUserById = async (req, res) => {
  try {
    const userId = req.decoded;
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  login,
  getUserById,
};
