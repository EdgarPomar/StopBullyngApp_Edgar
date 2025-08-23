import { Texture, TextStyle, HTMLText, Sprite } from "pixi.js";
import { Vector2 } from "../Vector2";
import { Point } from "../types/Point"
import { Rectangle } from "../Rectangle";
import { SceneManager } from "../SceneManager";
import { StringUtils } from "../StringUtils";

//Design the Button internal structure
export default class Button {  
  
  private buttonId: string;

  private text: string;
  private position: Vector2;
  private scale: Vector2;  
  private actor: Sprite;

  constructor(SceneManager: SceneManager, Id:string = "", ButtonText:string = "", Font: TextStyle, PositionX: number = 0, PositionY: number = 0, Width: number = 0, Height: number = 0, ButtonTexture: Texture) {    //Prepare the excepctions for missing texture and font
    
    if(StringUtils.isEmptyOrWhitespace(Id)) {
      throw new Error("Button without reference. Unable to initialize");      
    }
    this.buttonId = Id;

    if(Font == null) {
      throw new Error("Font is not initialized");      
    }
    if(ButtonTexture == null){
      throw new Error("Missing Texture in the button");
    }        

    //initialize the variables
    this.text = ButtonText;
    this.position = new Vector2(PositionX, PositionY);
    this.scale = new Vector2(Width, Height);            

    const buttonLabel = new HTMLText(
      {        
        text: `${ButtonText}`,
        style: Font,
        anchor: 0.5,
        resolution: 2,
        
      }
    );
    
    Font.wordWrapWidth = ButtonText.length - 10;    

    this.actor = SceneManager.Add(new Rectangle(PositionX, PositionY, Width, Height), ButtonTexture); 
    SceneManager.AddLabel(new Rectangle(PositionX + Width / 2 - 32, PositionY + Height / 2, Width/2, Height/4), buttonLabel);
  }
  public GetSprite(): Sprite {
    return this.actor;
  }
  public GetText(): string {
    return this.text;
  }
  public GetId(): string {
    return this.buttonId;
  }
  public SetText(newtext :string) {
    this.text = newtext;
  }  
  public GetRectangle(): Rectangle {    
    const posrect: Point = this.position.getLocation();
    const scalerect: Point = this.scale.getLocation();
    return new Rectangle(posrect.x, posrect.y, scalerect.x, scalerect.y);
  }
  public OnClick(actor:Sprite, callback: () => void): void {
    actor.eventMode = 'static';
    actor.on('pointerdown', () => {   
      callback();
    });    
  }
  
  public OnTap(){

  }
  
  public OnHover(){

  }  

}