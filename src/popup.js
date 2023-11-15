import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';

const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [tabId, setTabId] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)

	const createGallery = () => {
		setIsCreatingGallery(true);
		browser.scripting.executeScript({
			target: {tabId: tabId},
			files: ['./createGallery.js']
		}).then((result) => {
			console.log(result);
			setIsCreatingGallery(false);
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
					<button disabled={isCreatingGallery} onClick={() => createGallery()}>Start</button>
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
