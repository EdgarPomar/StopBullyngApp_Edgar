// modal.ts
import * as PIXI from "pixi.js";
import {gsap} from "gsap";

export class Modal {
    private modalContainer: PIXI.Container;
    private overlay: PIXI.Graphics;
    private contentContainer: PIXI.Container;
    private text: PIXI.Text;

/*TE ESTA CREANDO UNA VENTANA DE PIXI NUEVA*/
    constructor(app: PIXI.Application) {
        this.modalContainer = new PIXI.Container();
        this.modalContainer.visible = false;

        // Overlay semitransparente
        this.overlay = new PIXI.Graphics()
            .rect(0, 0, app.screen.width, app.screen.height)
            .fill({ color: 0x000000, alpha: 0.5 });

        this.overlay.interactive = true;
        this.overlay.cursor = "pointer";

        this.modalContainer.addChild(this.overlay);

        // Contenedor de contenido
        this.contentContainer = new PIXI.Container();
        this.modalContainer.addChild(this.contentContainer);

        // Fondo del modal
        const background = new PIXI.Graphics();
        background.roundRect(0, 0, 400, 250, 15).fill({ color: 0xFFFFFF });
        background.pivot.set(200, 125);
        this.contentContainer.addChild(background);

        // Texto del modal
        this.text = new PIXI.Text('', {
            fontSize: 24,
            fill: 0x000000,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 360
        });
        this.text.anchor.set(0.5);
        this.text.position.set(0, -20);
        this.contentContainer.addChild(this.text);

        // Botón de cerrar
        const closeButton = new PIXI.Graphics();
        closeButton.circle(0, 0, 20).fill({ color: 0xff0000 });       // fill with red color
        closeButton.position.set(180, -100);
        closeButton.interactive = true;
        closeButton.cursor = "pointer";    // pointer cursor on hover
        closeButton.on('pointerdown', () => this.close());
        this.contentContainer.addChild(closeButton);

        // Centrar modal
        this.contentContainer.position.set(app.screen.width / 2, app.screen.height / 2);

        app.stage.addChild(this.modalContainer);
    }

    /** Abrir con animación */
    open() {
        this.modalContainer.visible = true;
        this.contentContainer.scale.set(0);
        gsap.to(this.contentContainer.scale, { x: 1, y: 1, duration: 0.4, ease: "back.out(1.7)" });
    }

    /** Cerrar con animación */
    close() {
        gsap.to(this.contentContainer.scale, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "back.in(1.7)",
            onComplete: () => {
                this.modalContainer.visible = false;
            }
        });
    }

    /** Actualiza el texto del modal */
    setText(nuevoTexto: string) {
        this.text.text = nuevoTexto;
    }
}
