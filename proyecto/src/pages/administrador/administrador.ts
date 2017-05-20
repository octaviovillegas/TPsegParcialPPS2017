import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController } from 'ionic-angular';

@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class Administrador {

  private usuarioLogueado;
  constructor(public navCtrl: NavController, public navParams: NavParams,menu: MenuController) {
    
    this.usuarioLogueado = navParams.data;
  }



}
