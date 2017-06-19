import { Component } from '@angular/core';
import 'rxjs/Rx';
import { NavController,ViewController,NavParams,ModalController } from 'ionic-angular';
import {Encuestas} from '../encuestas/encuestas';
import { servicioAuth } from '../servicioAuth/servicioAuth';

@Component({
  selector: 'page-Profesor',
  templateUrl: 'profesor.html',
  providers: [ModalController]
})
export class Profesor {

 private  usuarioLogueado;

 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public NavParams: NavParams,
 public modalCtrl: ModalController,servAuth:servicioAuth) {
this.usuarioLogueado=servAuth.getUserInfo();
    }


}
