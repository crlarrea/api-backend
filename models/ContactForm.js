const { Schema, model } = require("mongoose");

const ContactFormSchema = Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    trim:true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("ContactForm", ContactFormSchema, "contact");
