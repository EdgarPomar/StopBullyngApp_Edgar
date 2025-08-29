import {AnimatedSprite, Assets, TextStyle, Texture, Ticker} from "pixi.js";
import {Game} from "./Game";
import {Rectangle} from "./Rectangle";
import {getSceneByNumericId} from "./services/scenesService";  // ruta correcta
import {Scene} from "./types/sceneType";
import Button from "./components/Button";
import Label from "./components/Label.ts";

import {Modal} from "./components/Modal.ts";
import {ContentManager} from "./Filesystem/Content.ts";
import {AudioPlayer} from "./Manager/AudioManager.tsx";

export class GuardianesGame extends Game {
    private currentScene: Scene | null = null;
    private modal: Modal | null = null;
    private walkerchar: AnimatedSprite | null = null;

    private async LoadAssets() {
        const textureBg: Texture = await Assets.load(ContentManager.GetPath(ContentManager.Content.backgrounds, "fondo.png"));
        const textureButton: Texture = await Assets.load(ContentManager.GetPath(ContentManager.Content.ui, "GenericButton.svg"));
        const walker_sheet = await Assets.load(ContentManager.GetPath(ContentManager.Content.characters, 'walker.json'));

        const audioSong = ContentManager.GetPath(ContentManager.Content.music, 'gcbullyingscene.ogg');


        this.scene.Add(new Rectangle(0, 0, this.preferredX + 72, this.preferredY), textureBg);
        // Carga texturas de botones
        // Carga escena por id numérico, por ejemplo 1
        this.currentScene = await getSceneByNumericId(1);

        if (this.currentScene) {
            // Primero pintamos la pregunta (ajusta posición y ancho si quieres)
            //this.scene.AddText(this.currentScene.pregunta, this.preferredX/2 - 128, this.preferredY/2 - 128, 600);

            this.modal = new Modal(this.scene.GetApp()); // suponiendo que GetApp() devuelve PIXI.Application
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
                this.currentScene.pregunta,
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
                if(this.modal != null) {
                    this.modal.setText("Aquí va la reflexión para el botón 1");
                    this.modal.open();
                    console.log("Callback botón 1 ejecutado");
                }



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
                if(this.modal != null) {
                    this.modal.setText("Aquí va la reflexión para el botón 2");
                    this.modal.open();
                    console.log("Callback botón 2 ejecutado");
                }
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
                if(this.modal != null) {
                    this.modal.setText("Aquí va la reflexión para el botón 3");
                    this.modal.open();
                    console.log("Callback botón 3 ejecutado");
                }

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
                if(this.modal !=null) {
                    this.modal.setText("Aquí va la reflexión para el botón 4");
                    this.modal.open();
                    console.log("Callback botón 4 ejecutado");
                }
            });

            const walker_animator = walker_sheet.animations['walk'];
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

            const player = new AudioPlayer(audioSong, false, 0.8);

            /*player.pause();   // Pause
            player.stop();    // Stop and reset*/
            player.setVolume(0.5); // Set volume to 50%
            player.setLoop(true);  // Enable looping
            player.play();    // Start playing

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
