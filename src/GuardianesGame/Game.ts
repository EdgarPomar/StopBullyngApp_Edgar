// Aquí irá la lógica y la estructura del juego
import * as PIXI from 'pixi.js';
import {SceneManager} from './SceneManager';
import {Assets, Ticker} from 'pixi.js';

export abstract class Game {
    public scene: SceneManager;
    private app: PIXI.Application;
     //prepare the relative coordinate values of the Client Resolution
    protected preferredX: number = 800;
    protected preferredY: number = 600;

    abstract Update(delta: Ticker): void;


    constructor() {
        this.app = new PIXI.Application();
        this.scene = new SceneManager(this.app);
    }

    UpdateCallback = (delta: Ticker) => {
        this.Update(delta);
    };

    Initialize = async (x: number, y: number) => {
        this.preferredX = x;
        this.preferredY = y;

        await this.InitGPU(this.preferredX, this.preferredY);

        this.app.ticker.add(this.UpdateCallback);
        await this.LoadContentAsync();
    }

    private InitGPU = async (x: number = 800, y: number = 600) => {
        try {
            const context = document.getElementById("viewportGame");
            if (context != null) {

                await this.app.init(
                    {
                        height: y,
                        width: x,
                        background: '#FFFFFF',
                        resizeTo: context,
                    }
                );

                if (this.app == null) {
                    console.log("NO SE PUDO INICIAR LA GPU");
                    return;
                }

                context.appendChild(this.app.canvas); // agregar canvas solo una vez
            }
        } catch (error) {
            console.log(error);
        }
    };
    private DestroyGPU = async ()=>{
        if(this.app != null) {
            this.app.stage.destroy({
                children: true,
                texture: true,
                textureSource: true, // En Pixi v8 en lugar de baseTexture
            });
        }
        Assets.reset();
    }
    Dispose(){
        this.app.ticker.remove(this.UpdateCallback);
        this.app.ticker.stop();
        this.UnloadContentAsync();
        this.DestroyGPU();
        this.app.destroy(true, { children: true, texture: true, textureSource: true });

    }
    abstract LoadContentAsync(): Promise<void>;
    abstract UnloadContentAsync(): Promise<void>;

}