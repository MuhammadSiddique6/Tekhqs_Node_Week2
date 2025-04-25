const express = require("express");
const users = require("../models/Signup");
exports.OnlyAdmins = async (req, res, next) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const check = await users.findOne({ email, role: "admins" });
      if (check) {
        next();
      } else {
        res.status(400).send("Access denied Only Admin can have access");
      }
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
