import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import typography from '../styles/Typography.module.css';
import { loginUser, getCurrentUser } from '../services/userService';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(email, password);

      // ✅ Obtener el usuario actual y mostrar en consola
      const user = await getCurrentUser();
      console.log('🔐 Sesión iniciada como:', user);

      navigate('/'); // redirige al inicio tras login
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={typography.title}>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={typography.body}>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={typography.body}>
          Contraseña:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={typography.buttonText}>
          Entrar
        </button>
      </form>

      {error && (
        <p className={typography.body} style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </p>
      )}

      <p className={typography.body}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
