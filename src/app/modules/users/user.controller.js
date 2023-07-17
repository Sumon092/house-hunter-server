const userService = require("./user.services");

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  registerUser,
};
