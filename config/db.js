const mongoose = require("mongoose");
//const logger = require("../winston/index");
require("dotenv").config();
const dbConnects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    //logger.info("Connected to MongoDB");
  } catch (err) {
    //logger.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = dbConnects;
