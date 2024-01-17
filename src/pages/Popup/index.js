import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../assets/styles/popup.scss';
import Popup from './Popup';
import "../../i18n/config";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
