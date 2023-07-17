// const express = require("express");
const mongoose = require("mongoose");
const app = require("./app.js");
const port = 5000;

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/house-hunter");
    console.log("Connected to data base");
    app.listen(port, () => {
      console.log(`Hunter Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();