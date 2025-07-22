import React, { useState } from 'react';
import styles from '../styles/AppBar.module.css';

const AppBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.appBar}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.avatarContainer} onClick={toggleMenu}>
        <img src="/avatar.png" alt="User Avatar" className={styles.avatar} />
        {menuOpen && (
          <div className={styles.dropdownMenu}>
            <a href="#">Profile</a>
            <a href="#">Account</a>
            <a href="#">Dashboard</a>
            <a href="#">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppBar;
