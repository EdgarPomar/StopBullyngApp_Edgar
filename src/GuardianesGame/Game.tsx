// Aquí irá la lógica y la estructura del juego
import * as PIXI from 'pixi.js';
export class Game {  
  name: string; 
  constructor() {
    this.name = "hello";
  }
  Initialize = async () => {
    await this.InitGPU(window.outerWidth, window.outerHeight);
  }
  InitGPU = async (x: number = 800, y: number = 600) => {
    try {
      const app = new PIXI.Application();
      const context = document.getElementById("viewportGame");
      if (context != null) {

        await app.init({ height: y, width: x, background: '#FF00FF' });

        if (app == null) {
          console.log("CAGADA");
          return;
        }

        context.appendChild(app.canvas); // agregar canvas solo una vez
      }
    } catch (error) {
      console.log(error);
    }
  };
}