import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';

@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class Ayuda {

 private  usuarioLogueado;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: servicioAuth) {
    this.usuarioLogueado=auth.getUserInfo();
    console.info(this.usuarioLogueado);
  }

  
}
