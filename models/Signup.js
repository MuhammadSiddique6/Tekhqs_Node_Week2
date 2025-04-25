const timeStamp = require("console");
const mongoose = require("mongoose");

const SignupScheme = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: false,
    },
    otpexpiry: {
      type: Date,
    },
    verify: {
      type: Boolean,
      required: true,
    },
    passverify: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("signup", SignupScheme);
