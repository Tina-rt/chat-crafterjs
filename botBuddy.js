const axios = require("axios");

let PAGE_ACCESS_TOKEN = "";
const setPageAccessToken = (pageAccessToken) => {
  PAGE_ACCESS_TOKEN = pageAccessToken;
};

const sendText = async (dest_id, text) => {
  data = {
    recipient: {
      id: `${dest_id}`,
    },
    messaging_type: "RESPONSE",
    message: {
      text: `${text}`,
    },
  };

  headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    data,
    {
      headers: headers,
    }
  );
};

const verifyToken = async (query) => {
  return (
    query["hub.mode"] === "subscribe" && query["hub.verify_token"] === "hello"
  );
};

module.exports = { setPageAccessToken, sendText, verifyToken };
