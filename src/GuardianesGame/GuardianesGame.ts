import {AnimatedSprite, Assets, TextStyle, Texture, Ticker} from "pixi.js";
import {Game} from "./Game";
import {Rectangle} from "./Rectangle";
import {getSceneByNumericId} from "./services/scenesService";  // ruta correcta
import {Scene} from "./types/sceneType";
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

            // Botón 1
            const btn1: Button = new Button(
                this.scene,
                "ID1",
                this.currentScene.opciones[0],
                arialFont,
                (this.preferredX / 2) - 289,
                (this.preferredY / 2) - 150,
                360,
                60,
                textureButton
            );
            btn1.OnClick(btn1.GetSprite(), () => {
                console.log("Callback botón 1 ejecutado");
            });

            // Botón 2
            const btn2: Button = new Button(
                this.scene,
                "ID2",
                this.currentScene.opciones[1],
                arialFont,
                (this.preferredX / 2) + 360 + 50 - 289,
                (this.preferredY / 2) - 150,
                360,
                60,
                textureButton
            );
            btn2.OnClick(btn2.GetSprite(), () => {
                console.log("Callback botón 2 ejecutado");
            });

            // Botón 3
            const btn3: Button = new Button(
                this.scene,
                "ID3",
                this.currentScene.opciones[2],
                arialFont,
                (this.preferredX / 2) - 289,
                (this.preferredY / 2) + 60 + 40 - 150,
                360,
                60,
                textureButton
            );
            btn3.OnClick(btn3.GetSprite(), () => {
                console.log("Callback botón 3 ejecutado");
            });

            // Botón 4
            const btn4: Button = new Button(
                this.scene,
                "ID4",
                this.currentScene.opciones[3],
                arialFont,
                (this.preferredX / 2) + 360 + 50 - 289,
                (this.preferredY / 2) + 60 + 40 - 150,
                360,
                60,
                textureButton
            );
            btn4.OnClick(btn4.GetSprite(), () => {
                console.log("Callback botón 4 ejecutado");
            });

            const sheet = await Assets.load(this.GetPath('sprites/walker.json'));
            const spritesheet = sheet.animations['walk'];
            const walkerchar: AnimatedSprite = this.scene.AddAnimatedSprite(
                new Rectangle(
                    this.preferredX / 2,
                    this.preferredY / 2,
                    650 / 2,
                    650 / 2),
                spritesheet
            );
            this.scene.PlayAnimatedSprite(walkerchar);
            this.scene.SetAnimatedSpriteSpeed(walkerchar, 0.1);
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
//        console.log(delta.deltaTime + "ms, " + delta.FPS + " FPS");
    }


}
