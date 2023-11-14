import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';

const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [tabId, setTabId] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);

	const handleStart = (tabId) => {
		console.log("clicked");
		browser.scripting.executeScript({
			target: {tabId: tabId},
			files: ['autoclick.js'],
			injectImmediately: false
		})
	}

	browser.tabs.query({active: true, currentWindow: true})
		.then((tabArray) => {
			const currentTab = tabArray[0];
			const currentURL = new URL(currentTab.url);
			if (currentURL.searchParams.get('tbm') === 'isch') {
				setTabURL(currentURL);
				setTabId(currentTab.id);
			} else {
				setInvalidURL(true);
			}
		})

	return (
		<>
			{ tabURL && (
				<>
					<div className="start">Query: { tabURL.searchParams.get('q') } </div>
					<button onClick={() => handleStart(tabId)}>Start</button>
				</>
			) }
			{ invalidURL && (
				<>
					<div className="error">Not Google Image Search tab</div>
				</>
			) }
		</>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
)
