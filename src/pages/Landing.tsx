import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Landing.module.css';
import typography from '../styles/Typography.module.css';

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState<number[]>([]); // tarjetas visibles
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleStart = () => {
        navigate('/game');
    };

    const mechanics = [
        { icon: "🎭", title: "Escoge tu respuesta", desc: "Se te mostrarán situaciones de la vida real relacionadas con el bullying." },
        { icon: "💡", title: "Toma decisiones", desc: "Selecciona la opción que creas más adecuada para resolver el conflicto." },
        { icon: "🧠", title: "Reflexiona", desc: "Después de cada elección, descubrirás el impacto de tus acciones." },
        { icon: "🏆", title: "Aprende y gana", desc: "Mejora tu puntuación mientras te conviertes en un Guardián de la Convivencia." }
    ];

    // Intersection Observer para animación al hacer scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute('data-index'));
                    if (entry.isIntersecting && !visibleCards.includes(index)) {
                        setVisibleCards((prev) => [...prev, index]);
                    }
                });
            },
            { threshold: 0.2 } // activa cuando el 20% de la tarjeta es visible
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [visibleCards]);

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
            <section className={`${styles.section}`}>
                <h2 className={typography.subtitle}>⚡ ¿Cómo se juega?</h2>
                <div className={styles.mechanicsGrid}>
                    {mechanics.map((item, index) => (
                        <div
                            key={index}
                            ref={(el: HTMLDivElement | null) => {
                                cardsRef.current[index] = el; // asignación sin retorno
                            }}
                            data-index={index}
                            className={`${styles.card} ${
                                visibleCards.includes(index)
                                    ? index % 2 === 0
                                        ? styles.slideRight
                                        : styles.slideLeft
                                    : ''
                            }`}
                            style={{ animationDelay: `${index * 0.3}s` }}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
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
