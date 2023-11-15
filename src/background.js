browser.runtime.onMessage.addListener((data) => {
	if (data.type === "open_session") {
		let creating = browser.tabs.create({
			"url": browser.runtime.getURL("./index.html")
		});
	}
})
