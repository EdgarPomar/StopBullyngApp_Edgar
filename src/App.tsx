import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import GameViewport from './pages/GameViewport';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <AppBar />
      <main style={{ marginTop: '60px', marginBottom: '50px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Game" element={<GameViewport />} />
          <Route
            path="/dashboard"
            element={
              user?.labels?.includes('admin') ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};


export default App;
