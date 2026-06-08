const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("Error found->", error.message);
    console.log("Trying to connect...");
    process.exit();
  }
};

module.exports = connectDatabase;
