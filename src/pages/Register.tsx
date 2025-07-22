import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import typography from '../styles/Typography.module.css';

const Register: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted');
  };

  return (
    <div className={styles.container}>
      <h2 className={typography.title}>Registrarse</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={typography.body}>
          Nombre de usuario:
          <input type="text" name="username" required />
        </label>
        <label className={typography.body}>
          Correo electrónico:
          <input type="email" name="email" required />
        </label>
        <label className={typography.body}>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <button type="submit" className={typography.buttonText}>
          Crear cuenta
        </button>
      </form>
      <p className={typography.body}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;
