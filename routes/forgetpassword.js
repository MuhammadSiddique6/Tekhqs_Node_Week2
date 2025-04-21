const express = require('express');
const forgetpassController = require('../controllers/forgetpassController');
const verifyController = require('../controllers/verficationController');
const router = express.Router();

router.post("/",forgetpassController.forgetotp);
router.post("/forgetpass",forgetpassController.forgetpass);
router.post("/newpassword",forgetpassController.newpassword);
router.post("/resend",verifyController.resend);


module.exports = router;

