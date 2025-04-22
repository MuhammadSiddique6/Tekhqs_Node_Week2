const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Signup");
const jwt = require("jsonwebtoken");
const otpfun = require("../utility/otp");
const SECRET_KEY = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existemail = await User.findOne({ email });
    if (existemail) {
      return res.status(400).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const {otp,expiry} = await otpfun(email);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      expiry,
      verify: false,
      passverify: true,
    });
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
    console.log(user);
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid password");
      } else {
        const token = jwt.sign({ email: user.email }, SECRET_KEY, {
          expiresIn: "2d",
        });
        console.log(token);
        return res.status(200).json({
          message: "Login successful",
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        });
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

exports.updateUsers = async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { name });
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      res.status(200).send("User updated successfully!");
    }
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};
