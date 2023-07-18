const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken.js");
const ownerController = require("./owner.controller.js");

router.post("/addHouse", verifyToken, ownerController.addHouse);
router.get("/getHouse", ownerController.getAllHouses);
router.get("/houses", ownerController.getHouses);
router.patch("/updateHouse/:id", ownerController.updateHouse);
router.delete("/deleteHouse/:id", ownerController.deleteHouse);

module.exports = router;
