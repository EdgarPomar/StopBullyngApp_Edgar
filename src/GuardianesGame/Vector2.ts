import { Point } from "./types/Point";

// This class represents the structure to define a 2d point in the virtual world.
export class Vector2 {
    private location: Point = {
        x: 0,
        y: 0,
    };   
    constructor(x:number = 0, y:number = 0){        
        this.location.x=x;
        this.location.y=y;
    }

    // This method gets the location in the 2d space
    public getLocation(): Point {
        return this.location;        
    }

    public setLocation(a:number, b:number){   
      
      const position: Point = {
        x: a,
        y: b,
      };      

      this.location = position;
    }

    static Add(a:Vector2, b:Vector2): Vector2 {
       return new Vector2(a.location.x + b.location.x, a.location.y + b.location.y);
    }
    static Substract(a:Vector2, b:Vector2): Vector2 {
       return new Vector2(a.location.x - b.location.x, a.location.y - b.location.y);
    }
    static Multiply(a:Vector2, b:Vector2): Vector2 {
       return new Vector2((a.location.x * b.location.x), (a.location.y * b.location.y));
    }

    static Scalar(a:Vector2, b:Vector2): number {
       return (a.location.x * b.location.x) + (a.location.y + b.location.y);       
    }
    static Divide(a:Vector2, b:Vector2): Vector2 {
       return new Vector2(a.location.x / b.location.x, a.location.y / b.location.y);
    }
}