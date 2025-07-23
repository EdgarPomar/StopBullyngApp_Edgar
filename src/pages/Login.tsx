import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import typography from '../styles/Typography.module.css';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className={styles.container}>
      <h2 className={typography.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={typography.body}>
          Nombre de usuario:
          <input type="text" name="username" required />
        </label>
        <label className={typography.body}>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <button type="submit" className={typography.buttonText}>
          Entrar
        </button>
      </form>
      <p className={typography.body}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
