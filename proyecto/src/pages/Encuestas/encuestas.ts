import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-Encuestas',
  templateUrl: 'encuestas.html'
})
export class Encuestas {
        private usuarioLogueado;



 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
 ,public NavParams: NavParams) {
   this.usuarioLogueado = NavParams.data;
   console.log(this.usuarioLogueado);
    }




}