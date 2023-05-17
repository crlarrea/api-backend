const express = require("express");
const FormController = require("../controllers/form");

const router = express.Router();



// Routes
router.post("/send-message", FormController.sendMessage);
router.post("/enquire", FormController.enquire);


module.exports = router;


