const express = require("express");
const User = require("../models/Signup");
const bcrypt = require("bcrypt");
const otpfun = require("../utility/otp");

exports.forgetotp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const { otp, expiry } = await otpfun(email);
    await User.updateOne(
      { _id: user._id },
      { $set: { otp: otp, otpexpiry: expiry } }
    );
    res.status(200).send("Otp sent");
  } catch (error){
    res.status(500).json({ message: "Otp not send error:", error: error.message });
  }
};

exports.forgetpass = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.otp === otp) {
      await User.updateOne(
        { _id: user._id },
        { $set: { passverify: false, otp: null, otpexpiry: null } }
      );
      return res.status(200).send("OTP matched!");
    } else {
      return res.status(400).send("Incorrect OTP");
    }
  } catch (error) {
    
    res.status(500).json({ message: "Forget password error:", error: error.message });
  }
};

exports.newpassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.passverify === false) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword, passverify: true } }
      );

      return res.status(200).send("Password reset successfully");
    } else {
      return res.status(400).send("OTP not verified or already used");
    }
  } catch (error) {
    res.status(500).json({ message: "Password Reset Error:", error: error.message });
  }
};
