const express = require("express");
const activity = require("../models/Activity");
const UserModel = require("../models/Signup.js");
const track = require("../models/track.js");

exports.createtask = async (req, res) => {
  const { email, task, description } = req.body;
  try {
    const user = UserModel.findOne({ email });
    if (!user) {
      res.status(401).res("User not exists");
    } else {
      const newActivity = new activity({
        date: Date.now(),
        task,
        status: "Pending",
        description,
        user_id: user._id,
        email,
      });
      await newActivity.save();

      const newtrack = new track({
        email,
        api: "Create task route",
        date: Date.now(),
      });
      await newtrack.save();

      res.status(200).send("successful");
    }
  } catch (err) {
    res.status(500).send("Server Issue ", err);
  }
};
exports.starttask = async (req, res) => {
  const { email, task } = req.body;
  try {
    const user = UserModel.findOne({ email });
    if (!user) {
      res.status(401).res("User not exists");
    } else {
      const newActivity = activity.findOne({ email });
      await newActivity.updateOne(
        { task: task },
        { $set: { status: "Start" } }
      );

      const newtrack = new track({
        email,
        api: "Start task route",
        date: Date.now(),
      });
      await newtrack.save();

      res.status(200).send("successful");
    }
  } catch (err) {
    res.status(500).send("Server Issue ", err);
  }
};
exports.endtask = async (req, res) => {
  const { email, task } = req.body;
  try {
    const user = UserModel.findOne({ email });
    if (!user) {
      res.status(401).res("User not exists");
    } else {
      const newActivity = activity.findOne({ email });
      await newActivity.updateOne(
        { task: task },
        { $set: { status: "Completed" } }
      );

      const newtrack = new track({
        email,
        api: "End task route",
        date: Date.now(),
      });
      await newtrack.save();

      res.status(200).send("successful");
    }
  } catch (err) {
    res.status(500).send("Server Issue ", err);
  }
};
