import { Assets, Texture, Ticker } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
import { getSceneByNumericId } from "./services/scenesService";  // ruta correcta
import { Scene } from "./types/sceneType";

export class GuardianesGame extends Game {
  private currentScene: Scene | null = null;

  private async LoadAssets() {
    const textureBg: Texture = await Assets.load('http://localhost:5173/fondo.png');
    this.scene.Add(new Rectangle(0, 0, 1536, 824), textureBg);

    const textureCloud: Texture = await Assets.load('http://localhost:5173/cloud.png');
    this.scene.Add(new Rectangle(0, 0, 64, 64), textureCloud);

    // Carga texturas de botones
    const textureButton_A: Texture = await Assets.load('http://localhost:5173/buttonA.svg');
    const textureButton_B: Texture = await Assets.load('http://localhost:5173/buttonB.svg');
    const textureButton_C: Texture = await Assets.load('http://localhost:5173/buttonC.svg');
    const textureButton_D: Texture = await Assets.load('http://localhost:5173/buttonD.svg');

    // Carga escena por id numérico, por ejemplo 1
    this.currentScene = await getSceneByNumericId(1);

    if (this.currentScene) {
      // Primero pintamos la pregunta (ajusta posición y ancho si quieres)
      this.scene.AddText(this.currentScene.pregunta, 412, 128, 600);

      // Luego pintamos las opciones como botones
      this.scene.AddButtonWithText(new Rectangle(768, 412, 128, 64), textureButton_A, this.currentScene.opciones[0]);
      this.scene.AddButtonWithText(new Rectangle(768 + 140, 412, 128, 64), textureButton_B, this.currentScene.opciones[1]);
      this.scene.AddButtonWithText(new Rectangle(768, 412 + 100, 128, 64), textureButton_C, this.currentScene.opciones[2]);
      this.scene.AddButtonWithText(new Rectangle(768 + 140, 412 + 100, 128, 64), textureButton_D, this.currentScene.opciones[3]);
    } else {
      console.error("No se pudo cargar la escena con id numérico 1");
    }
  }

  LoadContentAsync(): Promise<void> {
    return this.LoadAssets();
  }

  Update(delta: Ticker): void {
    console.log(delta.deltaTime + "ms, " + delta.FPS + " FPS");
  }
}
