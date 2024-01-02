import React, { useEffect, useId, useRef, useState } from 'react';
import Background from './components/Background';
import UrlAlert from './components/UrlAlert';

const Popup = () => {
	const currentTab = useRef(null);
	const [tabURL, setTabURL] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)
	const [maxGalleryLen, setMaxGalleryLen] = useState(1);
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
		console.log(maxGalleryLen);
		let sendMaxGalleryLen;
		if (maxGalleryLen > 50) {
			setMaxGalleryLen(50);
			sendMaxGalleryLen = 50;
		} else {
			sendMaxGalleryLen = maxGalleryLen;
		}
		browser.tabs.sendMessage(
			currentTab.current.id,
			{
				type: "create_gallery",
				maxGalleryLen: sendMaxGalleryLen
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
			image_query: tabURL.searchParams.get('q'),
			gallery: gallery
		});
		window.close();
	};


	const galleryLengthInput = useId();


	return (
		<>
			<div className='container'>
				{ tabURL && (
					<>
						<div className="setting">
							<label htmlFor={galleryLengthInput}>Gallery Length</label>
							<input
								id={galleryLengthInput}
								type="number"
								step={1}
								min={1}
								max={50}
								onChange={(e) => setMaxGalleryLen(Number(e.target.value))}
								value={maxGalleryLen}
							/>
						</div>
						<div className='buttons'>
							<button className={isCreatingGallery ? "inProgress" : ""} disabled={isCreatingGallery} onClick={() => createGallery()}>{!gallery ? "CREATE GALLERY" : "RECREATE GALLERY"}</button>
							<button disabled={!(gallery && gallery.length)} onClick={() => {openSession();}}>OPEN SESSION</button>
						</div>
					</>
				) }
				{ invalidURL && (
					<UrlAlert />
				) }
			</div>
			<Background />
		</>
	);
};

export default Popup;
