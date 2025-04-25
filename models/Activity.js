const timeStamp = require("console");
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signup",
  },
  email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("activity", activitySchema);
