const userService = require("./user.services");

// register user
async function registerUser(req, res) {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    console.log(result);
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
    const token = await userService.loginUser(email, password);
    res.json({
      status: 200,
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  login,
};
