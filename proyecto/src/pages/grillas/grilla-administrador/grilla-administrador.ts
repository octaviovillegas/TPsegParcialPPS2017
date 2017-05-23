import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-grilla-administrador',
  templateUrl: 'grilla-administrador.html',
})
export class GrillaAdministrador {

 Usuarios;
 UssAdm : Array<any> =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public modalCtrl: ModalController) {

  this.http.get("http://tppps2.hol.es/ws1/usuarios")
    .map(res => res.json())
    .subscribe((quote) =>{
    this.Usuarios = quote;


     for(let us of this.Usuarios)
      {
        if(us['tipo_usuario'] == "Administrador")
        {this.UssAdm.push(us);}
      }

    });




  }
jsonper= [ {
      nombre:"aixa",
      usuario:"aixa@aixa.com",
      clave:"aixa123",
      tipo_usuario:"admin"},
      { nombre:"pepe",
      usuario:"aixa@aixa.com",
      clave:"aixa123",
      tipo_usuario:"admin"},
      { nombre:"jose",
      usuario:"aixa@aixa.com",
      clave:"aixa123",
      tipo_usuario:"admin"},
      { nombre:"maria",
      usuario:"aixa@aixa.com",
      clave:"aixa123",
      tipo_usuario:"admin"}
    ];

    Modificar(id_usuario, usuario, nombre, clave, id_tipo)
    {
        let usM = {
            id_usuario: id_usuario,
            usuario: usuario,
            nombre: nombre,
            clave: clave,
            id_tipo: id_tipo
        };
        let modal = this.modalCtrl.create(ModificacionModal, usM);
        modal.present();
    }
}
