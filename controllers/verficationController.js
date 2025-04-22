const express = require("express");
const User = require("../models/Signup");
const nodemailer = require("nodemailer");

exports.verification = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }
    if (Date.now() > record.expiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    } else {
      if (user.otp === otp) {
        await User.updateOne({ _id: user._id }, { $set: { verify: true } });
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
    const otp = Math.floor(1000 + Math.random() * 9000);
    const { email } = req.body;
    const user = await User.findOne({ email });
    await User.updateOne({ _id: user._id }, { $set: { otp: otp } });

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
