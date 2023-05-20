const validator = require("validator");

const validateForm = (req) => {
  const data = req.body.data;
  const validationOutput =
    validator.isEmail(data.email) &&
    validator.isLength(data.email, { min: 6, max: 50 }) &&
    validator.isAlpha(data.name, "en-GB", { ignore: "-s'" }) &&
    validator.isLength(data.name, { min: 2, max: 50 }) &&
    validator.isLength(data.message, { min: 5, max: 300 });

  if (!validationOutput) {
    throw new Error("Failed to validate form fields.");
  }
};

const validateEnquire = (req) => {
  const data = req.body.data;
  const validationOutput =
    validator.isEmail(data.email) &&
    validator.isLength(data.email, { min: 6, max: 50 }) &&
    validator.isIn(data.plan, ["Starter", "Growth", "Pro"]) &&
    validator.isIn(data.billing, ["Monthly", "Yearly"]);

  if (!validationOutput) {
    throw new Error("Failed to validate form fields.");
  }
};
module.exports = {
  validateForm,
  validateEnquire,
};
