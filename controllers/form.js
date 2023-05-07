const { validateForm } = require("../helpers/validate");
const ContactForm = require("../models/ContactForm");
const sentToSlack = require("../helpers/slack");
const sendMessage = (req, res) => {
  // Collect params
  const params = req.body;

  // Validate form data
  try {
    validateForm(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Form fields validation failed",
    });
  }

  // Create new object to save to DB
  const formData = new ContactForm(params);

  // Save message to DB
  formData.save((error, savedEntry) => {
    if (error || !savedEntry) {
      return res.status(400).json({
        status: "error",
        message: "Saving message to DB failed.",
      });
    }

    // Send form data to Slack channel
    sentToSlack(req.body);

    // Return output of DB writing operation
    return res.status(200).json({
      status: "Success",
      message: "Form data saved to DB",
      entry: formData,
    });
  });
};

module.exports = {
  sendMessage,
};
