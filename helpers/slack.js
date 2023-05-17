const axios = require("axios");
require("dotenv").config();

const sendToSlack = async (req) => {
  const data = req.body.data;

  const message = {
    text: `${data.name ? `From: ${data.name}` : ""}\nEmail: ${data.email} ${
      data.plan ? `\nPlan: ${data.plan}` : ""
    }${data.billing ? `\nBilling: ${data.billing}` : ""} ${
      data.message ? `\nMessage: ${data.message}` : ""
    }`,
  };

  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    timeout: 5000,
  };

  const delivery = await axios
    .post(process.env.SLACK_API_ENDPOINT, message, config)
    .then((slackRes) => {
      if (slackRes.statusText === "OK") {
        return "success";
      }
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });

  if (!delivery) {
    throw new Error("Failed to send message to Slack.");
  }
};

module.exports = { sendToSlack };
