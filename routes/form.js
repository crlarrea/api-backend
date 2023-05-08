const express = require("express");
const FormController = require("../controllers/form");

const router = express.Router();



// Routes
router.post("/send-message", FormController.sendMessage);


module.exports = router;


