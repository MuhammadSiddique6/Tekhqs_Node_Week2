const express = require("express");
const User = require("../models/Signup");
const nodemailer = require("nodemailer");
const otpfun = require("../utility/otp");

exports.verification = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }
    if (Date.now() > user.otpexpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    } else {
      if (user.otp === otp) {
        await User.updateOne(
          { _id: user._id },
          { $set: { verify: true, otp: null, otpexpiry: null } }
        );
        return res.status(200).send("OTP matched and user verified");
      } else {
        return res.status(400).send("Incorrect OTP");
      }
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).send("Server Error");
  }
};

exports.resend = async (req, res) => {
  try {
    const { email } = req.body;
    const { otp, expiry } = await otpfun(email);
    const user = await User.findOne({ email });
    await User.updateOne(
      { _id: user._id },
      { $set: { otp: otp, otpexpiry: expiry } }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.Email_Password,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_GMAIL,
      to: email,
      subject: "Your OTP for Signup",
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Resend Otp successfully");
  } catch (error) {
    res.status(400).send("error:", error);
  }
};
