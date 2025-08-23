import { Application, Container, Sprite, Texture, Text, TextStyle, Graphics, HTMLText, AnimatedSprite, AnimatedSpriteOptions } from "pixi.js";
import { Rectangle } from "./Rectangle";
import { Point } from "./types/Point";

export class SceneManager {
    private scene: Container = new Container();
    private app: Application;

    constructor(gameapp: Application) {
        this.app = gameapp;
        this.app.stage.addChild(this.scene);
    }

    private centerScene() {
        this.scene.x = this.app.screen.width / 2;
        this.scene.y = this.app.screen.height / 2;
        this.scene.pivot.x = this.scene.width / 2;
        this.scene.pivot.y = this.scene.height / 2;
    }

    Add(actorRectangle: Rectangle, texture: Texture) : Sprite {
        const actorLocation: Point = actorRectangle.getLocation();
        const actorSize: Point = actorRectangle.getSize();
        const actor = new Sprite(texture);

        actor.x = actorLocation.x;
        actor.y = actorLocation.y;
        actor.width = actorSize.x;
        actor.height = actorSize.y;
        
        this.scene.addChild(actor);
        this.centerScene();
        return actor;
    }
       
    // Añadir sprite animado a la pantalla de juego y devolver el actor a meter para porder obtener su referencia.
    AddAnimatedSprite(actorRectangle: Rectangle, spritesheet: AnimatedSpriteOptions) : AnimatedSprite {
        const actorLocation: Point = actorRectangle.getLocation();
        const actorSize: Point = actorRectangle.getSize();
        const actor = new AnimatedSprite(spritesheet);

        actor.x = actorLocation.x;
        actor.y = actorLocation.y;
        actor.width = actorSize.x;
        actor.height = actorSize.y;
        
        actor.eventMode = 'static';
        actor.on('pointerdown', () => {
            console.log('anim sprite clicked!');
        });
        this.scene.addChild(actor);
        this.centerScene();

        return actor;
    }
    PlayAnimatedSprite(actor: AnimatedSprite){
        actor.play();
    }
    SetAnimatedSpriteSpeed(actor: AnimatedSprite, speed: number){     
        actor.animationSpeed = speed;
    }
    AddLabel(actorRectangle: Rectangle, labelText: HTMLText) {
        const actorLocation: Point = actorRectangle.getLocation();
        const actorSize: Point = actorRectangle.getSize();
        const actor = new Text(labelText);

        actor.x = actorLocation.x;
        actor.y = actorLocation.y;
        actor.width = actorSize.x;
        actor.height = actorSize.y;

        this.scene.addChild(actor);
        this.centerScene();
    }

    AddButtonWithText(
        rect: Rectangle,
        texture: Texture,
        text: string,
        onClick?: () => void
    ): Text {
        const location = rect.getLocation();
        const size = rect.getSize();

        // Contenedor interactivo
        const buttonContainer = new Container() as Container & { buttonMode: boolean; interactive: boolean };
        buttonContainer.x = location.x;
        buttonContainer.y = location.y;

        // Sprite del botón
        const buttonSprite = new Sprite(texture);
        buttonSprite.width = size.x;
        buttonSprite.height = size.y;
        buttonContainer.addChild(buttonSprite);

        // Borde estilo tabla
        const border = new Graphics();
        border.lineStyle(2, 0x000000);
        border.drawRect(0, 0, size.x, size.y);
        buttonContainer.addChild(border);

        // Texto
        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 14,
            fill: "black",
            align: "center",
            wordWrap: true,
            wordWrapWidth: size.x + 8,
        });
        const buttonText = new Text(text, style);
        buttonText.anchor.set(0.5);
        buttonText.x = size.x / 2 - 30;
        buttonText.y = size.y / 2;
        buttonContainer.addChild(buttonText);

        // Click
        if (onClick) {
            buttonContainer.interactive = true;
            buttonContainer.buttonMode = true;
            buttonContainer.on("pointertap", onClick);
        }

        this.scene.addChild(buttonContainer);
        this.centerScene();
        return buttonText;
    }

    AddText(text: string, x: number, y: number, maxWidth: number = 800) {
        const screenWidth = this.app.screen.width;

        // Ajuste de ancho para móviles
        if (screenWidth <= 600) {
            maxWidth = screenWidth - 40; // margen lateral
        }

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 18,
            fill: "black",
            wordWrap: true,
            wordWrapWidth: maxWidth,
            align: "center"
        });

        const message = new Text(text, style);
        message.x = x;
        message.y = y;

        this.scene.addChild(message);

        // 🛠 Ajuste de posición si es texto largo en móvil
        if (screenWidth <= 600 && message.height > 100) {
            message.y = this.app.screen.height / 2; // mover debajo
        }

        this.centerScene();
    }

}

