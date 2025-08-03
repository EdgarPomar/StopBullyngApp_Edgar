import { Assets, Texture } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
export class GuardianesGame extends Game{    
    private async LoadAssets(){
        const texture:Texture = await Assets.load('http://localhost:5173/cloud.png');        
        this.scene.Add(new Rectangle(-250,0,64,64),texture);
    }
    LoadContentAsync(): Promise<void> {        
        return new Promise(() => {
            this.LoadAssets();
        });
    }    
}