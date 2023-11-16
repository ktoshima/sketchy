browser.runtime.onMessage.addListener((data) => {
	if (data.type === "open_session") {
		browser.tabs.create({
			"url": browser.runtime.getURL("./index.html")
		});
		return Promise.resolve("session opened");
	}
})
