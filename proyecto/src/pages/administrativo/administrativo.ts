import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';

/**
 * Generated class for the Administrativo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-administrativo',
  templateUrl: 'administrativo.html',
})
export class Administrativo {

  usuarioLogueado;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: servicioAuth) {
      this.usuarioLogueado = this.auth.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Administrativo');

    
  }

}
