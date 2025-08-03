// Aquí irá la lógica y la estructura del juego
import * as PIXI from 'pixi.js';
import { SceneManager } from './SceneManager';
export abstract class Game {  
  public scene: SceneManager; 
  private app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application();
    this.scene = new SceneManager(this.app);
  }
  
  Initialize = async (x: number, y: number) => {
    await this.InitGPU(x, y);
    await this.LoadContentAsync();
  }
  
  private InitGPU = async (x: number = 800, y: number = 600) => {
    try {      
      const context = document.getElementById("viewportGame");
      if (context != null) {

        await this.app.init({ height: y, width: x, background: '#FFFFFF' });

        if (this.app == null) {
          console.log("CAGADA");
          return;
        }

        context.appendChild(this.app.canvas); // agregar canvas solo una vez
      }
    } catch (error) {
      console.log(error);
    }
  };  
  abstract LoadContentAsync(): Promise<void>;  
}