import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Landing.module.css';
import typography from '../styles/Typography.module.css';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/game');
    };

    return (
        <>
            {/* Bloque principal */}
            <div className={`${styles.container} ${styles.fadeIn}`}>
                <h1 className={typography.title}>Guardianes de la Convivencia</h1>
                <p className={typography.body}>
                    Un juego web interactivo para aprender a prevenir el acoso escolar, fomentar la empatía y mejorar la convivencia en el entorno escolar. 🚀
                </p>
            </div>

            {/* Sección: Mecánicas */}
            <section className={`${styles.section} ${styles.fadeInUp}`}>
                <h2 className={typography.subtitle}>⚡ ¿Cómo se juega?</h2>
                <div className={styles.mechanicsGrid}>
                    <div className={styles.card}>
                        <span className={styles.icon}>🎭</span>
                        <h3>Escoge tu respuesta</h3>
                        <p>Se te mostrarán situaciones de la vida real relacionadas con el bullying.</p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>💡</span>
                        <h3>Toma decisiones</h3>
                        <p>Selecciona la opción que creas más adecuada para resolver el conflicto.</p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>🧠</span>
                        <h3>Reflexiona</h3>
                        <p>Después de cada elección, descubrirás el impacto de tus acciones.</p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>🏆</span>
                        <h3>Aprende y gana</h3>
                        <p>Mejora tu puntuación mientras te conviertes en un Guardián de la Convivencia.</p>
                    </div>
                </div>
            </section>

            {/* Sección: Beneficios */}
            <section className={`${styles.sectionAlt} ${styles.fadeInUp}`}>
                <h2 className={typography.subtitle}>🌟 ¿Por qué jugar?</h2>
                <p className={typography.body}>
                    Este juego no solo es divertido, también te ayudará a desarrollar empatía, a fortalecer la autoestima y a construir un ambiente escolar más seguro y positivo.
                </p>
            </section>

            {/* Botón al final */}
            <div className={`${styles.finalButton} ${styles.fadeInUp}`}>
                <button
                    className={`${styles.startButton} ${typography.buttonText}`}
                    onClick={handleStart}
                >
                    Empezar ahora
                </button>
            </div>
        </>
    );
};

export default Landing;
