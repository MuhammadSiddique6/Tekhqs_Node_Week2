const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Signup");
const nodemailer = require("nodemailer")


exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existemail = await User.findOne({ email });
    if (existemail) {
      return res.status(400).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate a 4-digit OTP (between 1000–9999)
    const otp = Math.floor(1000 + Math.random() * 9000);

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

    const newUser = new User({ name, email, password: hashedPassword, otp });
    await newUser.save();

    res.status(200).send("User added and OTP sent!");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error during signup");
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid password");
      } else {
        res.status(200).send("Login successful!");
      }
    }
  } catch (error) {
    res.status(500).send("Error logging in user");
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      res.status(200).send("User deleted successfully!");
    }
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};

exports.updateUsers = async (req, res)=>
{
    const {email, name } = req.body;
    try{
        const user = await User.findOneAndUpdate({email}, {name});
        if (!user) {
            return res.status(400).send("User not found");
        } else {
            res.status(200).send("User updated successfully!");
        }
    } 
    catch (error) {
        res.status(500).send("Error updating user");
    }
};

