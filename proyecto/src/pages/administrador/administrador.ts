import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';

@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class Administrador {

  private usuarioLogueado;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      menu: MenuController, private auth: servicioAuth) {

    this.usuarioLogueado = this.auth.getUserInfo();
  }



}
