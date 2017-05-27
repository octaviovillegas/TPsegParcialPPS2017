import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ViewController} from 'ionic-angular';
import {Http, URLSearchParams} from '@angular/http';
/**
 * Generated class for the ModificacionModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-alta-modal',
  templateUrl: 'alta-modal.html',
})
export class AltaModal {

  n;
  t;
  c;
  u;
  id_usuario;
  id_tip;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public viewCtrl: ViewController) {
  this.t = navParams.data['tipo'];
  console.info(navParams.data['tipo']);
  }

 Alta(nombre, usuario, clave, id_tipo)
 {
     this.http.post("http://tppps2.hol.es/ws1/usuarios/alta", {
         clave: this.c,
         nombre: this.n,
         usuario: this.u,
         id_tipo: this.t
     })
    .map(res => res.json())
    .subscribe((quote) =>{
       console.info(quote);
       this.viewCtrl.dismiss();
     });
       
      
 
 }
 

 cancelar()
 {
    this.viewCtrl.dismiss();
 }


}
