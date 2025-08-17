import { Assets, Texture, Ticker } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
import { getSceneByNumericId } from "./services/scenesService";  // ruta correcta
import { Scene } from "./types/sceneType";

export class GuardianesGame extends Game {
  private currentScene: Scene | null = null;

  private async LoadAssets() {
    const textureBg: Texture = await Assets.load('http://localhost:5173/fondo.png');
    this.scene.Add(new Rectangle(0, 0, this.preferredX, this.preferredY), textureBg);

    const textureCloud: Texture = await Assets.load('http://localhost:5173/cloud.png');
    this.scene.Add(new Rectangle(0, 0, 64, 64), textureCloud);


    // Carga texturas de botones
    const textureButton: Texture = await Assets.load('http://localhost:5173/GenericButton.svg');    
    // Carga escena por id numérico, por ejemplo 1
    this.currentScene = await getSceneByNumericId(1);

    if (this.currentScene) {
      // Primero pintamos la pregunta (ajusta posición y ancho si quieres)
      this.scene.AddText(this.currentScene.pregunta, 580, 128, 600);

      // Luego pintamos las opciones como botones
      
      if (this.preferredX > 1200) {
        // 🖥️ Escritorio grande
        this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 300, this.preferredY/2, 480, 64), textureButton, this.currentScene.opciones[0]);
        this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 140, this.preferredY/2, 480, 64), textureButton, this.currentScene.opciones[1]);
        this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 300, this.preferredY/2 + 100, 480, 64), textureButton, this.currentScene.opciones[2]);
        this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 140, this.preferredY/2 + 100, 480, 64), textureButton, this.currentScene.opciones[3]);
      } else if (this.preferredX > 1024) {
          // 💻 Laptops
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 260, this.preferredY/2, 420, 64), textureButton, this.currentScene.opciones[0]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 60, this.preferredY/2, 420, 64), textureButton, this.currentScene.opciones[1]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 260, this.preferredY/2 + 100, 420, 64), textureButton, this.currentScene.opciones[2]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 60, this.preferredY/2 + 100, 420, 64), textureButton, this.currentScene.opciones[3]);
      } else if (this.preferredX > 768) {
          // 📟 Tablets normales
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 200, this.preferredY/2, 360, 60), textureButton, this.currentScene.opciones[0]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 40, this.preferredY/2, 360, 60), textureButton, this.currentScene.opciones[1]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 200, this.preferredY/2 + 80, 360, 60), textureButton, this.currentScene.opciones[2]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 40, this.preferredY/2 + 80, 360, 60), textureButton, this.currentScene.opciones[3]);
      } else if (this.preferredX > 600) {
          // 📱 Tablets pequeñas / móviles grandes
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 240, this.preferredY/2, 400, 64), textureButton, this.currentScene.opciones[0]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 60, this.preferredY/2, 400, 64), textureButton, this.currentScene.opciones[1]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 240, this.preferredY/2 + 100, 400, 64), textureButton, this.currentScene.opciones[2]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 60, this.preferredY/2 + 100, 400, 64), textureButton, this.currentScene.opciones[3]);
      } else if (this.preferredX > 300) {
          // 📱 Modo móvil normal
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 340, this.preferredY/2 + 0, 480, 64), textureButton, this.currentScene.opciones[0]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 340, this.preferredY/2 + 70, 480, 64), textureButton, this.currentScene.opciones[1]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 340, this.preferredY/2 + 140, 480, 64), textureButton, this.currentScene.opciones[2]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 + 340, this.preferredY/2 + 210, 480, 64), textureButton, this.currentScene.opciones[3]);
      } else {
          // 📲 Mini-móviles (≤ 300px)
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 120, this.preferredY/2 + 0, 240, 48), textureButton, this.currentScene.opciones[0]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 120, this.preferredY/2 + 60, 240, 48), textureButton, this.currentScene.opciones[1]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 120, this.preferredY/2 + 120, 240, 48), textureButton, this.currentScene.opciones[2]);
          this.scene.AddButtonWithText(new Rectangle(this.preferredX/2 - 120, this.preferredY/2 + 180, 240, 48), textureButton, this.currentScene.opciones[3]);
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
