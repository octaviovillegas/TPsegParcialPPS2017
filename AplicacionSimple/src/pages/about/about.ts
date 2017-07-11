import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { datos } from '../datos/datos';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 
fondo;
myColor;
  constructor(public navCtrl: NavController, public dato:datos) {
    this.myColor=dato.GetmyColor();
    this.fondo=dato.Getmifondo();
    console.info(this.fondo);
  }

}
