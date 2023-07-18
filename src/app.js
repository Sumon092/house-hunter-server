const express = require("express");
const cors = require("cors");
const userRoutes = require("./app/modules/users/user.route");
const ownerRoutes = require("./app/modules/owner/owner.route.js");
const renterRoutes = require("./app/modules/renter/renter.route.js");

const app = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/owners", ownerRoutes);
app.use("/api/v1/renters", renterRoutes);

app.get("/", (req, res) => {
  res.send("House hunter server is running");
});
module.exports = app;
