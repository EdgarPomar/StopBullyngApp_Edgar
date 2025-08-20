import { Assets, Texture, Ticker } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
import { getSceneByNumericId } from "./services/scenesService";  // ruta correcta
import { Scene } from "./types/sceneType";

export class GuardianesGame extends Game {
  private currentScene: Scene | null = null;

  private async LoadAssets() {
    const textureBg: Texture = await Assets.load('http://localhost:5173/fondo.png');
    this.scene.Add(new Rectangle(0, 0, this.preferredX + 72, this.preferredY), textureBg);    

    // Carga texturas de botones
    const textureButton: Texture = await Assets.load('http://localhost:5173/GenericButton.svg');    
    // Carga escena por id numérico, por ejemplo 1
    this.currentScene = await getSceneByNumericId(1);

    if (this.currentScene) {
      // Primero pintamos la pregunta (ajusta posición y ancho si quieres)
      this.scene.AddText(this.currentScene.pregunta, this.preferredX/2 - 128, this.preferredY/2 - 128, 600);

      // Luego pintamos las opciones como botones
            
      if (this.preferredX > 768) {
          this.scene.AddButtonWithText(new Rectangle(
                                      (this.preferredX/2 - 364) +128,
                                      this.preferredY/2, 
                                      360,
                                      60), 
                      textureButton, this.currentScene.opciones[0]);

          this.scene.AddButtonWithText(new Rectangle(
                                      (this.preferredX/2 + 0) + 128,
                                      this.preferredY/2,
                                      360,
                                      60),
                      textureButton, this.currentScene.opciones[1]);


          this.scene.AddButtonWithText(new Rectangle(
                                      (this.preferredX/2 - 364) + 128,
                                      this.preferredY/2 + 128, 
                                      360,
                                      60), 
                      textureButton, this.currentScene.opciones[0]);

          this.scene.AddButtonWithText(new Rectangle(
                                      (this.preferredX/2 + 0) + 128,
                                      this.preferredY/2 + 128,
                                      360,
                                      60),
                      textureButton, this.currentScene.opciones[1]);
          
      } else if (this.preferredX > 300) {       
        this.scene.AddButtonWithText(new Rectangle(
                                      ((this.preferredX/2 - 364) +128)/2,
                                      (this.preferredY/2) /2, 
                                      360/2,
                                      60/2), 
                      textureButton, this.currentScene.opciones[0]);

          this.scene.AddButtonWithText(new Rectangle(
                                      ((this.preferredX/2 + 0) + 128) / 2,
                                      (this.preferredY/2) / 2,
                                      360/2,
                                      60/2),
                      textureButton, this.currentScene.opciones[1]);


          this.scene.AddButtonWithText(new Rectangle(
                                      ((this.preferredX/2 - 364) + 128) / 2,
                                      (this.preferredY/2 + 128) / 2, 
                                      360/2,
                                      60/2), 
                      textureButton, this.currentScene.opciones[0]);

          this.scene.AddButtonWithText(new Rectangle(
                                      ((this.preferredX/2 + 0) + 128) / 2,
                                      (this.preferredY/2 + 128) / 2,
                                      360/2,
                                      60/2),
                      textureButton, this.currentScene.opciones[1]);
      }
    } else {
      console.error("No se pudo cargar la escena con id numérico 1");
    }
  }

  LoadContentAsync(): Promise<void> {
    return this.LoadAssets();
  }

  Update(delta: Ticker): void {
    //console.log(delta.deltaTime + "ms, " + delta.FPS + " FPS");
  }
}
