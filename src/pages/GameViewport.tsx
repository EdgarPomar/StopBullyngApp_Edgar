import React, { useEffect, useRef } from 'react';
import { GuardianesGame } from '../GuardianesGame/GuardianesGame';

const GameViewport: React.FC = () => {
  const iniciado = useRef(false); // bandera para evitar ejecuciones múltiples
  
  useEffect(() => {
    if (iniciado.current) return; // ya fue iniciado, salimos
    iniciado.current = true;
    
    const guardian:GuardianesGame = new GuardianesGame();    
    guardian.InitGPU();
    
  }, []);

  return (
    <div>
      <div id="viewportGame"></div>
    </div>
  );
};

export default GameViewport;
