import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'
import { SessionContextProvider } from './context/SessionContext';

const body = document.querySelector('body')
const app = document.createElement('div')

app.id = 'react-root'

if (body && !document.getElementById('react-root')) {
	body.prepend(app)
}

const container = document.getElementById('react-root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<SessionContextProvider>
			<App />
		</SessionContextProvider>
	</React.StrictMode>
)  // Render react component
