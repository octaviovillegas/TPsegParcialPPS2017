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
  selector: 'page-modificacion-modal',
  templateUrl: 'modificacion-modal.html',
})
export class ModificacionModal 
{

  n;
  t;
  c;
  u;
  id_usuario;
  http;

  constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http, public viewCtrl: ViewController)
  {
    this.c = navParams.data['clave'];
    this.n=navParams.data['nombre'];
    this.t=navParams.data['id_tipo'];
    this.u=navParams.data['usuario'];
    this.id_usuario = navParams.data['id_usuario'];
    this.http=htt;
  }

  Modificar(id_usuario, nombre, usuario, clave, id_tipo)
  {
      this.http.post("http://tppps2.hol.es/ws1/usuarios/modificar", {
          id_usuario: id_usuario,
          clave: clave,
          nombre: nombre,
          usuario: usuario,
          id_tipo: id_tipo
      })
      .map(res => res.json())
      .subscribe((quote) =>{
        this.viewCtrl.dismiss();
      });
        
        
  }

  Cancelar()
  {
      this.viewCtrl.dismiss();
  }
 
}
