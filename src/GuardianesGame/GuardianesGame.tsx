import { Assets, Texture, Ticker } from "pixi.js";
import { Game } from "./Game";
import { Rectangle } from "./Rectangle";
export class GuardianesGame extends Game{
    Update(delta: Ticker): void {
        //LA LOGICA DEL JUEGO AQUI 
        // EXAMPLE IF KEYPRESS = F llamar bailar
        console.log(delta.deltaTime + "ms, " + delta.FPS + " FPS");                
    }    
    private async LoadAssets(){
        //CARGAR TEXTURAS AQUI
        const texture:Texture = await Assets.load('http://localhost:5173/cloud.png');        
        this.scene.Add(new Rectangle(-250,0,64,64),texture);
    }
    LoadContentAsync(): Promise<void> {        
        return new Promise(() => {
            this.LoadAssets();
        });
    }
}