import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../assets/styles/popup.scss';
import Popup from './Popup';
import "../../i18n/config";
import i18next from 'i18next';

if (i18next.language === 'ja') {
	document.getElementById('root').classList.add("ja");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
