import {AnimatedSprite, Assets, TextStyle, Texture, Ticker} from "pixi.js";
import {Game} from "./Game";
import {Rectangle} from "./Rectangle";
import {getSceneByNumericId} from "./services/scenesService";  // ruta correcta
import {Scene} from "./types/sceneType";
import Button from "./components/Button";
import Label from "./components/Label.ts";
import {Content} from "./Filesystem/Content.ts";

export class GuardianesGame extends Game {
    private currentScene: Scene | null = null;

    private walkerchar: AnimatedSprite | null = null;

    private async LoadAssets() {
        const textureBg: Texture = await Assets.load(this.GetPath(Content.backgrounds, "fondo.png"));
        const textureButton: Texture = await Assets.load(this.GetPath(Content.ui, "GenericButton.svg"));
        const walker_sheet = await Assets.load(this.GetPath(Content.characters, 'walker.json'));

        this.scene.Add(new Rectangle(0, 0, this.preferredX + 72, this.preferredY), textureBg);
        // Carga texturas de botones
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
            new Label(
                this.scene,
                "title_label",
                "DB BLABLABLA?",
                arialFont,
                (this.preferredX / 2) - 75,
                (this.preferredY / 2) - 210,
                360,
                60,
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

            const walker_animator = walker_sheet.animations['walk'];
            /*const walkerchar: AnimatedSprite = this.scene.AddAnimatedSprite(
                new Rectangle(
                    this.preferredX / 2,
                    this.preferredY / 2 - 45,
                    650 / 2,
                    650 / 2),
                walker_animator
            );*/

            this.walkerchar = this.scene.AddAnimatedSprite(
                new Rectangle(
                    this.preferredX / 2 - 550,
                    this.preferredY / 2 - 45,
                    650 / 2,
                    650 / 2),
                walker_animator
            );

            this.scene.PlayAnimatedSprite(this.walkerchar);
            this.scene.SetAnimatedSpriteSpeed(this.walkerchar, 0.1);
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
        console.log(delta.deltaTime + "ms, " + delta.FPS + " FPS");
        if (this.walkerchar != null) {
            this.walkerchar.x = this.walkerchar.x += 0.5;
        }

    }


}
