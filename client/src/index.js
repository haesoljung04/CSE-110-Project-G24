import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/dark-mode.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from './context/ThemeContext';

const savedTheme = localStorage.getItem('darkMode') === 'true';
if (savedTheme) {
  document.body.classList.add('dark-mode');
}

const domain = "dev-z1p4dq5h1lfacble.us.auth0.com";
const clientId = "Cd6amcblJE1eBOQ1L8WGuAEVngZlpMTK";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
