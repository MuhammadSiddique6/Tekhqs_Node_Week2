const express = require("express");
const router = express.Router();
const adminControl = require("../controllers/adminController");
const SuperAdmin = require("../middleware/superadmin");
const Admin = require("../middleware/admins");
const {verifytoken}= require("../middleware/verifytoken");


router.post("/changerole",verifytoken, adminControl.changerole);
router.get("/users",verifytoken, Admin.OnlyAdmins, adminControl.getusers); //admin control
router.get("/allusers",verifytoken, SuperAdmin.onlySuperAdmin, adminControl.getalluser); // super admin control
router.post("/userstatus",verifytoken, Admin.OnlyAdmins, adminControl.userstatus); // admin controll
router.post("/alluserstatus",verifytoken, SuperAdmin.onlySuperAdmin,adminControl.allstatus); //  super admin controller

module.exports = router;
