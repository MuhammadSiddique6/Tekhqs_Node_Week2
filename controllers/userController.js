const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Signup");
const jwt = require("jsonwebtoken");
const otpfun = require("../utility/otp");

const SECRET_KEY = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existemail = await User.findOne({ email });
    if (existemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and its expiry
    const { otp, expiry } = await otpfun(email);

    // Create new user
    const newUser = new User({
      role: "users",
      name,
      email,
      password: hashedPassword,
      otp,
      otpexpiry: expiry,
      verify: false,
      passverify: true,
      status: true,
    });

    // Save user to database
    await newUser.save();

    // Respond to user
    res.status(200).json({ message: "User added and OTP sent!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Check if user is verified and active
    if (user.verify === true && user.status === true) {
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "2d", // Token expiration set to 2 days
      });

      // Save token to user document
      user.token = token;
      await user.save();

      // Return success response with token and user data
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } else {
      return res.status(400).json({ message: "Not verified or Blocked By Admin" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Find and delete user by email
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

exports.updateUsers = async (req, res) => {
  const { email, name } = req.body;

  try {
    // Find and update user by email
    const user = await User.findOneAndUpdate({ email }, { name });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

exports.logout = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not logged in" });
    }

    // Verify the user and ensure status is active
    if (user.verify === true && user.status === true) {
      // Nullify the token on logout
      user.token = null;
      await user.save();

      // Return success response
      return res.status(200).json({
        message: "Logout successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
