browser.action.onClicked.addListener((tab) => {
	console.log("tab url is: ", tab.url);
	const tabURL = new URL(tab.url);
	if (tabURL.searchParams.get('tbm') === 'isch') {
		console.log('this tab has google image search url');
	}
});
