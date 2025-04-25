const mongoose = require("mongoose");
const timeStamp = require("console");

const trackScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  api: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("track", trackScheme);
