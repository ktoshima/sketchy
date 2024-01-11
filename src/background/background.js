const browser = require("webextension-polyfill");

let image_query = "";
let gallery = [];

browser.runtime.onMessage.addListener((message) => {
	if (message.type === "open_session") {
		image_query = message.image_query;
		gallery = message.gallery;
		browser.tabs.create({
			"url": browser.runtime.getURL("./app.html")
		});
		return Promise.resolve('Opened session');
	} else if (message.type === "request_gallery") {
		return Promise.resolve({
			image_query: image_query,
			gallery: gallery
		});
	}
	return false;
});
