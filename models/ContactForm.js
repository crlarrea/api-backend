const { Schema, model } = require("mongoose");

const ContactFormSchema = Schema({
  email: {
    type: String,
    format: email,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("ContactForm", ContactFormSchema, "contact_form");

