import { AnimatedSprite, Assets, TextStyle, Texture, Ticker, Container } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
import { getSceneByNumericId } from "./services/scenesService";
import { Scene } from "./types/sceneType";
import Button from "./components/Button";
import Label from "./components/Label.ts";
import { Modal } from "./components/Modal.ts";
import { ContentManager } from "./Filesystem/Content.ts";
import { AudioPlayer } from "./Manager/AudioManager.tsx";
import { getReflexionesByEscenaPrefix } from "./services/reflexionesService.ts";
import { Reflexion } from "./types/reflectionType.ts";

export class GuardianesGame extends Game {
    private currentScene: Scene | null = null;
    private currentReflection: Reflexion[] | null = null;
    private modal: Modal | null = null;
    private walkerchar: AnimatedSprite | null = null;
    private sceneIndex: number = 1;

    private player: AudioPlayer | null = null;




    // Buffers
    private frontBuffer: Container;
    private backBuffer: Container;

    constructor() {
        super();
        this.frontBuffer = new Container();
        this.backBuffer = new Container();
        this.scene.GetApp().stage.addChild(this.frontBuffer);

        const audioSong = ContentManager.GetPath(ContentManager.Content.music, "gcbullyingscene.ogg");
        this.player = new AudioPlayer(audioSong, false, 0.8);

    }

    private async BuildRoom(idroom: string): Promise<Container> {
        // Cargar datos de la escena
        this.currentScene = await getSceneByNumericId(parseInt(idroom, 10));
        this.currentReflection = await getReflexionesByEscenaPrefix(idroom);

        // Nuevo contenedor (backbuffer)
        const container = new Container();

        // Fondo
        const textureBg: Texture = await Assets.load(
            ContentManager.GetPath(ContentManager.Content.backgrounds, "fondo.png")
        );
        this.scene.Add(new Rectangle(0, 0, this.preferredX, this.preferredY), textureBg);

        // Modal
        this.modal = new Modal(this.scene.GetApp());

        if (this.currentScene) {
            const arialFont = new TextStyle({
                fontFamily: "Arial",
                fontSize: 20,
                fill: "black",
                align: "left",
                wordWrap: false,
                wordWrapWidth: 15,
            });

            // Pregunta
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

            // Botones (los 4 con callbacks)
            const textureButton: Texture = await Assets.load(
                ContentManager.GetPath(ContentManager.Content.ui, "GenericButton.svg")
            );

            this.currentScene.opciones.forEach((opcion, index) => {
                const x = (index % 2 === 0)
                    ? (this.preferredX / 2) - 289
                    : (this.preferredX / 2) + 360 + 50 - 289;

                const y = (index < 2)
                    ? (this.preferredY / 2) - 150
                    : (this.preferredY / 2) + 60 + 40 - 150;

                const btn = new Button(
                    this.scene,
                    "ID" + (index + 1),
                    opcion,
                    arialFont,
                    x,
                    y,
                    360,
                    60,
                    textureButton,
                );

                btn.OnClick(btn.GetSprite(), () => {
                    if (this.modal && this.currentReflection) {
                        const reflectionText: string = this.currentReflection[index].texto;
                        this.modal.setText(reflectionText);
                        this.modal.open();
                    }
                    this.NextRoom();
                });
            });

            // Personaje animado
            const walker_sheet = await Assets.load(
                ContentManager.GetPath(ContentManager.Content.characters, "walker.json")
            );
            const walker_animator = walker_sheet.animations["walk"];
            this.walkerchar = this.scene.AddAnimatedSprite(
                new Rectangle(
                    this.preferredX / 2 - 550,
                    this.preferredY / 2 - 45,
                    650 / 2,
                    650 / 2
                ),
                walker_animator,
            );
            this.scene.PlayAnimatedSprite(this.walkerchar);
            this.scene.SetAnimatedSpriteSpeed(this.walkerchar, 0.1);



                this.player.setVolume(0.5);
                this.player.setLoop(true);
                this.player.play();
        }

        return container;
    }

    private SwapBuffers() {
        const app = this.scene.GetApp();

        app.stage.removeChild(this.frontBuffer);

        const temp = this.frontBuffer;
        this.frontBuffer = this.backBuffer;
        this.backBuffer = temp;

        app.stage.addChild(this.frontBuffer);

        this.backBuffer.removeChildren(); // limpiar el viejo
    }

    private NextRoom() {
        if (this.sceneIndex >= 10) {
            console.log("Última escena alcanzada. No hay más rooms.");
            return; // 🔒 detenemos aquí
        }
        this.sceneIndex++;
        const sceneName = String(this.sceneIndex);

        this.BuildRoom(sceneName).then((newContainer) => {
            this.backBuffer = newContainer;
            this.SwapBuffers();
            console.log("Room swapped a:", sceneName);
        }).catch(err => console.error(err));
    }

    async LoadContentAsync(): Promise<void> {
        this.frontBuffer = await this.BuildRoom(String(this.sceneIndex));
        this.scene.GetApp().stage.addChild(this.frontBuffer);
    }

    UnloadContentAsync(): Promise<void> {
        this.frontBuffer.removeChildren();
        this.backBuffer.removeChildren();

        if (this.player) {
            this.player.stop();
        }
        this.player = null;

        return Promise.resolve();
    }
    //mejor hablo escribiendo, más que nada por si se molestan tus padres estando ocupado vot a poner el droidcam

    Update(delta: Ticker): void {
    //    console.log(delta.deltaTime + "ms, " + delta.FPS + " FPS");
        if (this.walkerchar) {
            this.walkerchar.x += 0.5;
        }
    }
}
