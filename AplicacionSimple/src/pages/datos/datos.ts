import {Injectable} from "@angular/core";

@Injectable()
export class Datos {

  private myColor;
  private miFondo= {};
   
  constructor() {  }

 

 SetMyColor(val)
 {
    this.myColor=val;
 }

 GetMyColor()
 {
   return this.myColor;
 }

  SetMiFondo(val)
 {
    this.miFondo=val;
 }

 GetMiFondo()
 {
   return this.miFondo;
 }

}


 