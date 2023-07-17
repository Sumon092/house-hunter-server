const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("House hunter server is running");
});
module.exports = app;
