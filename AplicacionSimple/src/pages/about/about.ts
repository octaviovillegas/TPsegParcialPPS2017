import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Datos } from '../datos/datos';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 
fondo;
myColor;
  constructor(public navCtrl: NavController, public dato:Datos) {
    this.myColor=dato.GetMyColor();
    this.fondo=dato.GetMiFondo();
  }

  ionViewDidEnter(){
    this.myColor=this.dato.GetMyColor();
    this.fondo=this.dato.GetMiFondo();
  }

}
