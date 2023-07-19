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
    res.json({
      status: 409,
      error: error.message,
    });
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
    res.json({
      status: 401,
      message: error.message,
    });
  }
}

//get user
const getUserById = async (req, res) => {
  try {
    const userId = req.decoded;
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.json({
        status: 404,
        message: "User not found",
      });
    }
    return res.json(user);
  } catch (error) {
    return res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  login,
  getUserById,
};
