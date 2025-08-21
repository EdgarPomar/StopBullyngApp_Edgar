import { Assets, TextStyle, Texture, Ticker } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
import { getSceneByNumericId } from "./services/scenesService";  // ruta correcta
import { Scene } from "./types/sceneType";
import Button from "./components/Button";

export class GuardianesGame extends Game {
  private currentScene: Scene | null = null;

  private GetPath(filename: string): string {    
    return `${window.location.origin.replace(/\/$/, "")}/${filename}`;        
  }

  private async LoadAssets() {
    const textureBg: Texture = await Assets.load(this.GetPath("fondo.png"));
    this.scene.Add(new Rectangle(0, 0, this.preferredX + 72, this.preferredY), textureBg);    

    // Carga texturas de botones
    const textureButton: Texture = await Assets.load(this.GetPath("GenericButton.svg"));    
    // Carga escena por id numérico, por ejemplo 1
    this.currentScene = await getSceneByNumericId(1);

    if (this.currentScene) {
      // Primero pintamos la pregunta (ajusta posición y ancho si quieres)
      //this.scene.AddText(this.currentScene.pregunta, this.preferredX/2 - 128, this.preferredY/2 - 128, 600);

      // Luego pintamos las opciones como botones      
      const arialFont = new TextStyle(
        {                               
          fontFamily: "Arial",
          fontSize: 20,
          fill: "black",
          align: "left",
          wordWrap: false,
          wordWrapWidth: 0,        
        }
      );
        
      for (let i=0; i < 4; ++i) {
        new Button(
          this.scene,
          this.currentScene.opciones[i],
          arialFont,
          this.preferredX/2 * i, 
          this.preferredY/2 * i,  
          360,
          60,
          textureButton);
      }

      if (this.preferredX > 768) {
        console.log();
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
