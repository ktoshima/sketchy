import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);
	const navigate = useNavigate();

	const handleStart = (e) => {
		e.preventDefault();
		navigate("/input-form");
	}

	browser.tabs.query({active:true, currentWindow:true})
		.then((tabArray) => {
			const currentTab = tabArray[0];
			const currentURL = new URL(currentTab.url);
			if (currentURL.searchParams.get('tbm') === 'isch') {
				setTabURL(currentURL);
			} else {
				setInvalidURL(true);
			}
		});

	return (
		<>
			{ tabURL && (
				<>
					<div className="start">Query: { tabURL.searchParams.get('q') } </div>
					<button onClick={handleStart}>Start</button>
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

export default Popup;
