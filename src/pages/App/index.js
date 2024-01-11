import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../assets/styles/app.scss';
import "@fontsource/ntr/400.css";
import "@fontsource/noto-sans-jp/400.css";
import App from './App';
import { SessionContextProvider } from './context/SessionContext';
import "../../i18n/config";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
