import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';

/**
 * Generated class for the Alumno page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-alumno',
  templateUrl: 'alumno.html',
})
export class Alumno {

    private usuarioLogueado;
    private encuestas = [];

    constructor(public navCtrl: NavController, private auth: servicioAuth, public navParams: NavParams) {
        this.usuarioLogueado = this.auth.getUserInfo();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Alumno');
    }

}
