const express = require('express');
const verifyController = require('../controllers/verficationController');
const router = express.Router();

router.post("/",verifyController.verification)
router.post("/resend",verifyController.resend);

module.exports = router;
