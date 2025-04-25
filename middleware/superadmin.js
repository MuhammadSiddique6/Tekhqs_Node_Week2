const express = require("express");
const users = require("../models/Signup");
exports.onlySuperAdmin = (req, res, next) => {
  try {
    if (req.user) {
      const email = req.user;
      if (users.findOne({ email, role: "SuperAdmin" })) {
        next();
      }
    } else {
      res.status(403).send("Access denied. Only SuperAdmins are allowed.");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
