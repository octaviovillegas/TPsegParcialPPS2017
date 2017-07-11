import {Injectable} from "@angular/core";
@Injectable()
export class datos {

   
  constructor() {
    
  }

  myColor = "Rojo";
  mifondo= {};
 
 SetmyColor(val)
 {
    this.myColor=val;
 }

 GetmyColor()
 {
   return this.myColor;
 }

  Setmifondo(val)
 {
    this.mifondo=val;
 }

 Getmifondo()
 {
   return this.mifondo;
 }

}


 