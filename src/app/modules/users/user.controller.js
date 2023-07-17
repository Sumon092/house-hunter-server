const userService = require("./user.services");

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    console.log(result);
    res.json({
      status: 200,
      message: "User Created Successful",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  registerUser,
};
