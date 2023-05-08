const { validateForm } = require("../helpers/validate");
const ContactForm = require("../models/ContactForm");
const {sendToSlack} = require("../helpers/slack");

const sendMessage = async (req, res) => {
  // Collect params
  const params = req.body;

  // Validate form data
  try {
    await validateForm(params.data);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Form fields validation failed",
    });
  }
  sendToSlack(params.data)

  // Create new object and save to DB
  try {
    const formData = await new ContactForm(params.data);
    const message = await formData.save();
    console.log(message)
    return res.status(200).json({
      status: "success"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: "Failed to save to DB",
    });
  }


};


module.exports = {
  sendMessage,
};
