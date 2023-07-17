const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken.js");
const ownerController = require("./owner.controller.js");

router.post("/addHouse", ownerController.addHouse);

module.exports = router;
