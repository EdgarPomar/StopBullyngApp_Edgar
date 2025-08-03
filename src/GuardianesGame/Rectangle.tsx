import { Point } from "./types/Point";
import { Vector2 } from "./Vector2";

// This class represents where it draw and the size of it
export class Rectangle extends Vector2{   
    private width: number;
    private height: number;
        
    constructor(x: number, y: number, width: number, height: number){          
        if (!Number.isInteger(x)) throw new Error("El valor debe ser un número entero");
        if (!Number.isInteger(y)) throw new Error("El valor debe ser un número entero");
        if (!Number.isInteger(width)) throw new Error("El valor debe ser un número entero");
        if (!Number.isInteger(height)) throw new Error("El valor debe ser un número entero");
        super(x, y);

        this.width = width;    
        this.height = height;            
    }
    public setSize(x:number, y:number){
        this.width=x;
        this.height=y;        
    }
    
    public getSize(): Point {
        const newSize: Point = {
            x: this.width,
            y: this.height,
        };
        return newSize;
    }
}