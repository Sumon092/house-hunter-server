const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const verifyToken = require("../../middleware/verifyToken");

router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.get("/user", verifyToken, userController.getUserById);

module.exports = router;
