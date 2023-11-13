browser.action.onClicked.addListener((tab) => {
	console.log(tab.url);
	const tabURL = new URL(tab.url);
	if (tabURL.searchParams.get('tbm') === 'isch') {
		console.log('google image search url');
		browser.scripting.executeScript({
			target: {
				tabId: tab.id,
			},
			files: ["content_script.js"],
			injectImmediately: false
		});
	}
});
