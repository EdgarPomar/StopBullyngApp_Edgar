import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <Router>
      {/* AppBar fijo arriba */}
      <AppBar />

      <main style={{ marginTop: '60px', marginBottom: '50px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Redirigir cualquier ruta desconocida a la landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer fijo abajo */}
      <Footer />
    </Router>
  );
};

export default App;
