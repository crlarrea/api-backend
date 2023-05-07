const axios = require("axios");
require("dotenv").config();


const sendToSlack = (data)=>{

    const message = {
        text: `From: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      };
  
      const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        timeout: 1000,
      };
  
    axios
    .post(process.env.SLACK_API_ENDPOINT, message, config)
    .then((res) => {
      if (res.statusText === "OK") {
        console.log("Message sent to Slack channel");
      } else {
        throw Error("Message to Slack channel failed.");
      }
    })
    .catch((err) => console.log(`Something went wrong ${err}`));
}

module.exports = {sendToSlack}