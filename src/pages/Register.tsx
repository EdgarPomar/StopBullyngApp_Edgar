import React from 'react';
import styles from '../styles/Register.module.css';

const Register: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted');
  };

  return (
    <div className={styles.container}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nombre de usuario:
          <input type="text" name="username" required />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Crear cuenta</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Register;
