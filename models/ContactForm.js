const { Schema, model } = require("mongoose");

const ContactSchema = Schema({
  email: {
    type: String,
    trim: true,
    min: 6,
    max: 50,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    min: 5,
    max: 300,
  },
  message: {
    type: String,
    trim: true,
    min: 5,
    max: 50,
  },
  plan: {
    type: String,
    trim: true,
    enum: ["Starter", "Growth", "Pro"],
  },
  billing: {
    type: String,
    trim: true,
    enum: ["Monthly", "Annual"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
}, { strict: true });

module.exports = model("ContactForm", ContactSchema, "contact");
