let gallery = [];

browser.runtime.onMessage.addListener((message) => {
	if (message.type === "open_session") {
		gallery = message.gallery;
		browser.tabs.create({
			"url": browser.runtime.getURL("./index.html")
		});
		return true;
	} else if (message.type === "request_gallery") {
		return Promise.resolve({ gallery: gallery });
	}
});
