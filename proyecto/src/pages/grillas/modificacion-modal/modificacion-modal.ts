import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions} from 'ionic-angular';
import {Http, URLSearchParams} from '@angular/http';
/**
 * Generated class for the ModificacionModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modificacion-modal',
  templateUrl: 'modificacion-modal.html',
})
export class ModificacionModal {
  n;
  t;
  c;
  u;
  http;
  constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http) {
    console.info(navParams.data);
    this.c = navParams.data['clave'];
    this.n=navParams.data['nombre'];
    this.t=navParams.data['tipo'];
    this.u=navParams.data['usuario'];
    this.http=htt;
  }

 Modificar(n,c,t)
 {

   let data = new URLSearchParams();
   data.append('clave',c);
   data.append('nombre',n);
   data.append('tipo',t);

 //var obj = {"clave":c,"nombre":n,"tipo":t};

     this.http.post("http://tppps2.hol.es/ws1/usuarios/modificar/" + data)
    .map(res => res.json())
    .subscribe((quote) =>{
    //console.info(quote);
     });
 }
}
