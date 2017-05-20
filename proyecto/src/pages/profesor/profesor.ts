import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,ViewController,NavParams,ModalController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {modalEncuesta} from '../modalEncuesta/modalEncuesta';

@Component({
  selector: 'page-Profesor',
  templateUrl: 'profesor.html',
  providers: [ModalController]
})
export class Profesor {
        
   usuarioLogueado = {
 usuario: "",
  clave: "",
  tipo: ""
   } 

 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public NavParams: NavParams,
 public modalCtrl: ModalController) {
         this.usuarioLogueado = NavParams.data;
    }

AbrirModal(queHago){
  if(queHago == "Generar"){
      let modal = this.modalCtrl.create(modalEncuesta,this.usuarioLogueado);
      modal.present();
  }else  if(queHago == "Enviar"){

  }
   
}
   
   dismiss() {
    this.viewCtrl.dismiss();
  }

}