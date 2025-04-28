const express = require("express");
const UserModel = require("../models/Signup");

exports.changerole = async (req, res) => {
  const { email, role } = req.body;
  try {
    const existemail = await UserModel.findOne({
      email,
      role: { $in: ["admins", "users"] },
    });
    if (!existemail) {
      res.status(400).send("User Not existed");
    } else {
      if (role === existemail.role) {
        res.status(200).send("Already Updated");
      }
      if (role !== UserModel.role) {
        await UserModel.updateOne(
          { _id: existemail._id },
          { $set: { role: role } }
        );
        res.status(200).send("Role Updated");
      }
    }
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
};

exports.getalluser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const query = { role: { $in: ["admins", "users"] } };
    const users = await UserModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const totalusers = await UserModel.countDocuments(query);
    const totalpages = Math.ceil(totalusers / limit);
    const nextpage = page < totalpages ? page + 1 : null;

    res.status(200).json({
      message: "All Users",
      users: users.map((user) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      })),
      page,
      nextpage,
      totalpages,
      totalusers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error", error);
  }
};

exports.getusers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const query = { role: "users" };
    const users = await UserModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const totalusers = await UserModel.countDocuments(query);
    const totalpages = Math.ceil(totalusers / limit);
    const nextpage = page < totalpages ? page + 1 : null;

    res.status(200).json({
      message: "Only Users",
      users: users.map((user) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      })),
      page,
      nextpage,
      totalpages,
      totalusers,
    });
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
};

exports.allstatus = async (req, res) => {
  const { email, status } = req.body;
  try {
    const users = await UserModel.findOne({
      email,
      role: { $in: ["admins", "users"] },
    });
    if (users.status !== status) {
      users.status = status;
      await users.save();
      res.status(200).send("status change");
    } else {
      res.status(400).send("status already change");
    }
  } catch (error) {
    res.status(500).send("Server Error", error);
    console.log(error);
  }
};

exports.userstatus = async (req, res) => {
  const { email, status } = req.body;
  try {
    const users = await UserModel.findOne({ email, role: "users" });
    if (users.status !== status) {
      users.status = status;
      await users.save();
      res.status(200).send("status change");
    } else {
      res.status(400).send("status already change");
    }
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
};
