import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import './popup.css';

const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [tabId, setTabId] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		console.log('re-rendered');
	}, [isCreatingGallery]);

	const createGallery = () => {
		setIsCreatingGallery(true);
		browser.scripting.executeScript({
			target: {tabId: tabId},
			files: ['./createGallery.js']
		});
	}

	const openSession = () => {
		// send background.js message to open index.html
		browser.runtime.sendMessage({
			type: "open_session",
			gallery: gallery
		})
		return null;
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

	browser.runtime.onMessage.addListener((data) => {
		if (data.type === "gallery_ready") {
			setGallery(data.gallery);
			setIsCreatingGallery(false);
		}
	})

	return (
		<>
			{ tabURL && (
				<>
					<div className="query">Query: { tabURL.searchParams.get('q') } </div>
					<button disabled={isCreatingGallery} onClick={() => {createGallery();}}>Create Gallery</button>
					<div className="gallery">Gallery length: { gallery.length } </div>
					<button disabled={!gallery.length} onClick={() => {openSession();}}>Open session</button>
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
