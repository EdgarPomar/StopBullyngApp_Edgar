import React, { useState } from 'react';
import styles from '../styles/AppBar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AppBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.appBar}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.avatarContainer} onClick={toggleMenu}>
        {/* ✅ Mostrar nombre si hay sesión */}
        {user && <span className={styles.userName}>{user.name}</span>}

        <img src="/avatar.png" alt="User Avatar" className={styles.avatar} />

        {menuOpen && (
          <div className={styles.dropdownMenu}>
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <a href="#">Perfil</a>
                <a href="#">Dashboard</a>
                <button onClick={logout} className={styles.logoutBtn}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default AppBar;
