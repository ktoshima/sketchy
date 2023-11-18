import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import './popup.css';

const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [tabId, setTabId] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)
	const [gallery, setGallery] = useState(null);

	// check if rendering-loop occurring
	useEffect(() => {
		console.log('popup rendered');
	});

	// run only once initialized
	useEffect(() => {
		// receive message once createGallery.js finished running
		browser.runtime.onMessage.addListener(galleryListener);
		// get current tab id and URL, decide if URL is google image search
		browser.tabs.query({active: true, currentWindow: true})
			.then((tabArray) => {
				const currentTab = tabArray[0];
				if (currentTab.url) {
					const currentURL = new URL(currentTab.url);
					if (currentURL.searchParams.get('tbm') === 'isch') {
						setTabURL(currentURL);
						setTabId(currentTab.id);
					} else {
						setInvalidURL(true);
					}
				}
			});
	}, []);

	const createGallery = () => {
		setIsCreatingGallery(true);
		// initiate gallery creation by running createGallery.js
		browser.scripting.executeScript({
			target: {tabId: tabId},
			files: ['./createGallery.js']
		});
	}

	const galleryListener = (data) => {
		if (data.type === "gallery_ready") {
			console.log("gallery received");
			setGallery(data.gallery);
			setIsCreatingGallery(false);
			return Promise.resolve("gallery set done");
		}
		return false;
	}

	const openSession = () => {
		// send background.js a message to open index.html
		browser.runtime.sendMessage({
			type: "open_session",
			gallery: gallery
		});
		window.close();
	};




	return (
		<>
			{ tabURL && (
				<>
					<div className="query">Query: { tabURL.searchParams.get('q') } </div>
					<button disabled={isCreatingGallery} onClick={() => {createGallery();}}>{!gallery ? "Create Gallery" : "Recreate Gallery"}</button>
					<div className="gallery">Gallery length: { (gallery && gallery.length) ? gallery.length : "empty" } </div>
					<button disabled={!(gallery && gallery.length)} onClick={() => {openSession();}}>Open session</button>
				</>
			) }
			{ invalidURL && (
				<>
					<div className="error">Not Google Image Search tab</div>
				</>
			) }
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
)

// google.com/search?q=cat&tbm=isch
