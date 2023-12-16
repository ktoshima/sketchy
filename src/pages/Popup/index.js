import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../assets/styles/popup.css';
import Popup from './Popup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
