import {HTMLText, Sprite, TextStyle} from "pixi.js";
import {SceneManager} from "../SceneManager.ts";
import {Vector2} from "../Vector2.ts";
import {StringUtils} from "../StringUtils.ts";
import {Rectangle} from "../Rectangle.ts";
import {Point} from "../types/Point.ts";

export default class Label {
    private labelId: string;
    private text: string;

    private position: Vector2;
    private scale: Vector2;
    private actor: Sprite;

    constructor(SceneManager: SceneManager, Id: string = "", text: string = "", Font: TextStyle, PositionX: number = 0, PositionY: number = 0, Width: number = 0, Height: number = 0) {

        if (StringUtils.isEmptyOrWhitespace(Id)) {
            throw new Error("Label without reference. Unable to initialize");
        }
        this.labelId = Id;

        if (Font == null) {
            throw new Error("Font is not initialized");
        }

        if (SceneManager == null) {
            throw new Error("SceneManager is not initialized");
        }

        //difine label variables properties
        this.text = text;
        this.position = new Vector2(PositionX, PositionY);
        this.scale = new Vector2(Width, Height);
        this.actor = new Sprite();


        const labelContainer = new HTMLText(
            {
                text: `${text}`,
                style: Font,
                anchor: 0.5,
                resolution: 2,

            }
        );
        Font.wordWrapWidth = text.length - 10;

        SceneManager.AddLabel(
            new Rectangle(PositionX + Width / 2 - 32, PositionY + Height / 2, Width / 2, Height / 4),
            labelContainer);
    }

    public GetSprite(): Sprite {
        return this.actor;
    }

    public GetText(): string {
        return this.text;
    }

    public GetId(): string {
        return this.labelId;
    }

    public SetText(newtext: string) {
        this.text = newtext;
    }

    public GetRectangle(): Rectangle {
        const posrect: Point = this.position.getLocation();
        const scalerect: Point = this.scale.getLocation();
        return new Rectangle(posrect.x, posrect.y, scalerect.x, scalerect.y);
    }

}