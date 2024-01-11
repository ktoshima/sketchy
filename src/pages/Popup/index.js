import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../assets/styles/popup.scss';
import "@fontsource/ntr/400.css";
import "@fontsource/simonetta/400.css";
import Popup from './Popup';
import "../../i18n/config";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
