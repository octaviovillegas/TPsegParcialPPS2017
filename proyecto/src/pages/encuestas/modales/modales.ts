import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalController, ViewController } from 'ionic-angular';
import {Encuestas} from "../encuestas";

@Component({
  selector: 'page-Modales',
  templateUrl: 'modales.html'
})
export class Modales {
        public queHacer={
          tipo:"",
          pregunta:""
        };
        private veoText=false;
        private encuestas;
 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
 ,public NavParams: NavParams) 
{
  
   this.queHacer = NavParams.data;
   console.info(this.queHacer);
        if(this.queHacer.tipo == "text"){
          this.veoText=true; 
             }
    }
     


dismiss() {
   this.viewCtrl.dismiss(this.queHacer).then(() =>{
  
   });
 }


}