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
import styles from './styles/Apptsx.module.css';
import {logoutUser} from "./services/userService.ts";
import {GuardianesGame} from "./GuardianesGame/GuardianesGame.ts";

const App: React.FC = () =>
{

  const { user } = useAuth();
  const guardian: GuardianesGame = new GuardianesGame();

  const LogoutAsync = async () => {
    logoutUser();
  }

  if(!user)
  {
      LogoutAsync();
      return (
          <Router>
              <AppBar />
              <main className={styles.appMain}>
                  <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
              </main>
              <Footer />
          </Router>
      );
  }
  else
  {
      return (
        <Router>
            <AppBar webglsurface={guardian}></AppBar>
          <main className={styles.appMain}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                  path="/Game"
                  element={
                    !user ? (<Navigate to="/login" replace />) : (<GameViewport webglsurface={guardian}></GameViewport>)
                  }
              />
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
  }
};


export default App;
