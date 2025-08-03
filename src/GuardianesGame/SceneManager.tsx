import { Application, Container, Sprite, Texture } from "pixi.js";
import { Rectangle } from "./Rectangle";
import { Point } from "./types/Point";

export class SceneManager{
    private scene: Container = new Container();
    private app: Application;        

    constructor(gameapp: Application){
        this.app = gameapp;        
        this.app.stage.addChild(this.scene); 
    }

    Add(actorRectangle:Rectangle, texture:Texture){      
        let actorLocation: Point = {                    
            x: 0,                    
            y: 0,
        };  
        let actorSize: Point = {                    
            x: 0,                    
            y: 0,
        };  
        actorLocation = actorRectangle.getLocation();
        actorSize = actorRectangle.getSize();
                
        const actor = new Sprite(texture);

        actor.x = actorLocation.x;
        actor.y = actorLocation.y;
        actor.width = actorSize.x;
        actor.height = actorSize.y;

        this.scene.addChild(actor);  
        
        this.scene.x = this.app.screen.width / 2;
        this.scene.y = this.app.screen.height / 2;     

        this.scene.pivot.x = this.scene.width / 2;
        this.scene.pivot.y = this.scene.height / 2;
    
    }
}
