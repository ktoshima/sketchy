import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

const Popup = () => {
	const currentTab = useRef(null);
	const [tabURL, setTabURL] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)
	const [maxGalleryLen, setMaxGalleryLen] = useState(30);
	const [gallery, setGallery] = useState(null);

	// run only once initialized
	useEffect(() => {
		// get current tab id and URL, decide if URL is google image search
		browser.tabs.query({active: true, currentWindow: true})
			.then((tabArray) => {
				currentTab.current = tabArray[0];
				if (currentTab.current.url) {
					const currentURL = new URL(currentTab.current.url);
					if (currentURL.searchParams.get('tbm') === 'isch') {
						setTabURL(currentURL);
					} else {
						setInvalidURL(true);
					}
				}
			});
	}, []);

	const createGallery = () => {
		setIsCreatingGallery(true);
		// initiate gallery creation by sending a message to content script
		// sending message to content script is only supported through tabs.sendMessage
		browser.tabs.sendMessage(
			currentTab.current.id,
			{
				type: "create_gallery",
				maxGalleryLen: maxGalleryLen
			}
		).then((response) => {
			setGallery(response.gallery);
			setIsCreatingGallery(false);
		});
	};


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
					<input
						type="number"
						step={1}
						min={1}
						max={50}
						onChange={(e) => setMaxGalleryLen(Number(e.target.value))}
						value={maxGalleryLen}
					/>
					<button disabled={isCreatingGallery} onClick={() => createGallery()}>{!gallery ? "Create Gallery" : "Recreate Gallery"}</button>
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
