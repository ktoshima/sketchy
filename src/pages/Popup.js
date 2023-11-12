import { useState } from 'react';

const Popup = () => {
	const [tabURL, setTabURL] = useState(null);
	const [invalidURL, setInvalidURL] = useState(false);

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
					<button>Start</button>
				</>
			) }
			{ invalidURL && ( <div className="error">Not Google Image Search tab</div> ) }
		</>
	)
}

export default Popup;
