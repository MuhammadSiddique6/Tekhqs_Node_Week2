const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.post("/signin",userController.signin);
router.post("/signup",userController.signup);
router.delete("/delete",userController.deleteUser);
router.put("/update",userController.updateUsers);

module.exports = router;
