import React, { useEffect, useRef, useState } from 'react';
import { GuardianesGame } from '../GuardianesGame/GuardianesGame';
import styles from '../styles/GameViewport.module.css';

const GameViewport: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const iniciado = useRef(false);

  const [resolucionX, setResolucionX] = useState(0);
  const [resolucionY, setResolucionY] = useState(0);

  useEffect(() => {
    if (iniciado.current) return;
    iniciado.current = true;

    const div = viewportRef.current;
    if (!div) {
      return;
    }
    
    // Inicializar juego con las dimensiones del div
    const guardian: GuardianesGame = new GuardianesGame();

    // Función para actualizar resoluciones
    const actualizarResolucion = () => {      
      setResolucionX(div.offsetWidth);
      setResolucionY(div.offsetHeight);
      
      //guardian.ChangeScreenResolution(div.offsetWidth, div.offsetHeight);
      
    };    
    // Observar cambios de tamaño del div
    const observer = new ResizeObserver(() => {
      actualizarResolucion();
    });

    observer.observe(div);    
    guardian.Initialize(div.offsetWidth, div.offsetHeight);
//    guardian.Dispose();

    // Inicializar con las dimensiones actuales
    actualizarResolucion();
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div
        id="viewportGame"
        ref={viewportRef}
        className={`${styles.viewGame}`}
      ></div>
      <p>Resolución X: {resolucionX}px</p>
      <p>Resolución Y: {resolucionY}px</p>
    </div>
  );
};

export default GameViewport;
