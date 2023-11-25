import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

// font import for material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';


const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [tabId, setTabId] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)
	const [gallery, setGallery] = useState(null);

	// check if rendering-loop occurring
	// useEffect(() => {
	// 	console.log('popup rendered');
	// });

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

	const CreateGalleryButton = () => {
		return (
			<Box sx={{m: 1, position: 'relative'}}>
				<Button
					variant="contained"
					disabled={isCreatingGallery}
					onClick={() => createGallery()}
				>
					{!gallery ? "Create Gallery" : "Recreate Gallery"}
				</Button>
				{ isCreatingGallery && (
					<CircularProgress
						size={24}
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-12px',
							marginLeft: '-12px',
						}}
					/>
				) }
			</Box>
		)
	};

	const OpenSessionButton = () => {
		return (
			<Box sx={{m:1, position: 'relative'}}>
				<Button variant="contained" disabled={!(gallery && gallery.length)} onClick={() => openSession()}>
					Open Session
				</Button>
			</Box>
		)
	}

	const InvalidURLAlert = () => {
		return (
			<Box sx={{width: '100%'}}>
				<Alert severity="error">
					<AlertTitle>This website is not supported</AlertTitle>
					Currently Sketchy only supports <strong>Google Image Search</strong>.
				</Alert>
			</Box>
		)
	}


	return (
		<>
			{ tabURL && (
				<>
					<div className="query">Query: { tabURL.searchParams.get('q') } </div>
					<CreateGalleryButton />
					<div className="gallery">Gallery length: { (gallery && gallery.length) ? gallery.length : "empty" } </div>
					<OpenSessionButton />
				</>
			) }
			{ invalidURL && (
				// <>
				// 	<div className="error">Not Google Image Search tab</div>
				// </>
				<InvalidURLAlert />
			) }
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<Popup />
		</ThemeProvider>
	</React.StrictMode>
)

// google.com/search?q=cat&tbm=isch
