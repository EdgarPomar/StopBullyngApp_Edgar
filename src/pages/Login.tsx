import React from 'react';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nombre de usuario:
          <input type="text" name="username" required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </div>
  );
};

export default Login;
