import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fonts/fonts.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthProvider'; // Asegúrate de que la ruta es correcta

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
