import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Landing.module.css';
import typography from '../styles/Typography.module.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={typography.title}>Guardianes de la Convivencia</h1>
      <p className={typography.body}>
        Un juego web interactivo para aprender a prevenir el acoso escolar, fomentar la empatía y mejorar la convivencia en el entorno escolar. 🚀
      </p>
      <button className={`${styles.startButton} ${typography.buttonText}`} onClick={handleStart}>
        Empezar ahora
      </button>
    </div>
  );
};

export default Landing;
