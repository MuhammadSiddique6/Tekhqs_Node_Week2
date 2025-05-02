const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

const userController = require("../controllers/userController");
const activityController = require("../controllers/activityController");
const { verifytoken } = require("../middleware/verifytoken");


router.post("/signin", async (req, res) => {
  await connectDB();
  userController.signin(req, res);
});

router.post("/signup", async (req, res) => {
  await connectDB();
  userController.signup(req, res);
});

router.delete("/delete", async (req, res) => {
  await connectDB();
  userController.deleteUser(req, res);
});

router.put("/update", async (req, res) => {
  await connectDB();
  userController.updateUsers(req, res);
});

router.post("/logout", async (req, res) => {
  await connectDB();
  userController.logout(req, res);
});

// All user task routes
router.post("/createtask", verifytoken, async (req, res) => {
  await connectDB();
  activityController.createtask(req, res);
});

router.post("/starttask", verifytoken, async (req, res) => {
  await connectDB();
  activityController.starttask(req, res);
});

router.post("/endtask", verifytoken, async (req, res) => {
  await connectDB();
  activityController.endtask(req, res);
});

module.exports = router;
