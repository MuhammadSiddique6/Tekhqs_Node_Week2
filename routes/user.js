const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const activityController = require("../controllers/activityController");
const { verifytoken } = require("../middleware/verifytoken");

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.delete("/delete", userController.deleteUser);
router.put("/update", userController.updateUsers);
router.post("/logout", userController.logout);

//All user Perform Task

router.post("/createtask", verifytoken, activityController.createtask);
router.post("/starttask", verifytoken, activityController.starttask);
router.post("/endtask", verifytoken, activityController.endtask);

module.exports = router;
