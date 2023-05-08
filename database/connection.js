const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_ADDRESS);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    throw new Error("Connection to DB failed");
  }
};

module.exports = {
  connection,
};
