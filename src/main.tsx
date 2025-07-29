import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/fonts.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
