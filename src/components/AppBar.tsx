import React, {useState} from 'react';
import styles from '../styles/AppBar.module.css';
import {Link} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import {GuardianesGame} from "../GuardianesGame/GuardianesGame.ts";

interface AppBarProps {
    webglsurface?: GuardianesGame
}

const AppBar: React.FC<AppBarProps> = ({webglsurface}: AppBarProps) => {
    const {user, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);

    const CloseGameSesion = ()=> {
        webglsurface?.Dispose();
        logout();
    }
    const renderMenuItems = () => {
        if (!user) {
            return (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            );
        }
        return (
            <>
                <a href="#">Perfil</a>
                {user.labels?.includes('admin') && <Link to="/dashboard">Dashboard</Link>}
                <button onClick={CloseGameSesion} className={styles.logoutBtn}>Logout</button>
            </>
        );
    };

    return (
        <header className={styles.appBar}>
            <div className={styles.logoContainer}>
                <img src="/logo.png" alt="Logo" className={styles.logo}/>
            </div>

            {/* Avatar (solo tablet/desktop) */}
            <div className={styles.avatarContainer} onClick={toggleAvatarMenu}>
                {user && <span className={styles.userName}>{user.name}</span>}
                <img src="/avatar.png" alt="User Avatar" className={styles.avatar}/>

                {avatarMenuOpen && (
                    <div className={styles.dropdownMenu}>
                        {renderMenuItems()}
                    </div>
                )}
            </div>

            {/* Burger menu (solo móvil) */}
            <div className={styles.burgerContainer} onClick={toggleMenu}>
                {user && <span className={styles.userNameMobile}>{user.name}</span>}
                <div className={styles.burger}>&#9776;</div>
            </div>

            {/* Menú móvil desplegable */}
            {menuOpen && (
                <nav className={styles.mobileMenu}>
                    {renderMenuItems()}
                </nav>
            )}
        </header>
    );
};

export default AppBar;
