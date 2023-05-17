const { validateForm, validateEnquire } = require("../helpers/validate");
const ContactForm = require("../models/ContactForm");
const { sendToSlack } = require("../helpers/slack");

const sendMessage = async (req, res, next) => {
  try {
    // Validate form data
    await validateForm(req);

    // Send message to Slack
    await sendToSlack(req, res);

    // Create new object and save to DB
    const formData = await new ContactForm(req.body.data);
    const message = await formData.save();
    console.log(`Saved to DB: ${message}`);

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

const enquire = async (req, res, next) => {
  try {
    // Validate form Enquiry
    await validateEnquire(req);

    // Send message to Slack
    await sendToSlack(req, res);

    // Create new object and save to DB
    const formData = await new ContactForm(req.body.data);
    const message = await formData.save();
    console.log(`Saved to DB: ${message}`);

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  enquire,
};
