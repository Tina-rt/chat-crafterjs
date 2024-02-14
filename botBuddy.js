const axios = require("axios");

let PAGE_ACCESS_TOKEN = "";
const setPageAccessToken = (pageAccessToken) => {
	PAGE_ACCESS_TOKEN = pageAccessToken;
};

const sendRaw = async (payload) => {
	headers = {
		"Content-Type": "application/json",
	};
	return axios.post(
		`https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
		payload,
		{
			headers: headers,
		}
	);
};

const sendTypeOn = async (dest_id) => {
	const data = {
		recipient: {
			id: `${dest_id}`,
		},
		sender_action: "typing_on",
	};
	return sendRaw(data);
};
const sendTypeOff = async (dest_id) => {
	const data = {
		recipient: {
			id: `${dest_id}`,
		},
		sender_action: "typing_off",
	};
	return sendRaw(data);
};
const markSeen = async (dest_id) => {
	const data = {
		recipient: {
			id: `${dest_id}`,
		},
		sender_action: "mark_seen",
	};
	return sendRaw(data);
};
const sendText = async (dest_id, text) => {
	const data = {
		recipient: {
			id: `${dest_id}`,
		},
		messaging_type: "RESPONSE",
		message: {
			text: `${text}`,
		},
	};

	await sendRaw(data);
	return sendTypeOff(dest_id);
};

const verifyToken = async (query) => {
	return (
		query["hub.mode"] === "subscribe" && query["hub.verify_token"] === "hello"
	);
};

class Menu{
	title;
	payload;
	constructor(title, payload){
		this.title = title;
		this.payload = payload;
	}

	toJson(){
		return {
			content_type: "text",
			title: this.title,
			payload: this.payload
		}
	}
}

const sendQuickreply = async (dest_id, text, menu) => {
	const data = {
		recipient: {
			id: dest_id
		},
		messaging_type: "RESPONSE",
		message: {
			text: text,
			quick_replies: menu
		}
	}
	return sendRaw(data)
}

module.exports = {
	setPageAccessToken,
	sendText,
	verifyToken,
	sendTypeOn,
	sendTypeOff,
	markSeen,
	sendQuickreply,
	Menu
};
