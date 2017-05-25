import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
 

@Component({
  selector: 'page-grilla-administrativo',
  templateUrl: 'grilla-administrativo.html',
})
export class GrillaAdministrativo {

 
    Usuarios;
    UssAdm : Array<any> =[];
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth ,public navParams: NavParams, public viewCtrl: ViewController ,private http: Http, public modalCtrl: ModalController) {
    console.info("pasaaa");
  this.CargaGrilla();

  }

  CargaGrilla(){
    console.info("entro");
  this.Usuarios=null;
  this.UssAdm=[];
    this.http.get("http://tppps2.hol.es/ws1/usuarios")
    .map(res => res.json())
    .subscribe((quote) =>{
    this.Usuarios = quote;
    console.info(this.Usuarios);

     for(let us of this.Usuarios)
      {
        if(us['tipo_usuario'] == "Administrativo")
        {this.UssAdm.push(us);
        console.info(us);
        }
      }

    });

  }

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
        modal.onDidDismiss(data=>{
          console.info("paso por aca!!");
          this.CargaGrilla();
        });
        modal.present();
        
    }

        Eliminar(id_usuario, usuario, nombre, clave, id_tipo)
        {
              let alert = this.alertCtrl.create({
              title: 'Eliminacion de usuario',
              message: 'Confirma eliminar usuario '+ usuario,
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancelar clicked');
                  }
                },
                {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Aceptar clicked');
                    this.http.post("http://tppps2.hol.es/ws1/usuarios/eliminar", {
                           id_usuario: id_usuario,
                           clave: clave,
                           nombre: nombre,
                           usuario: usuario,
                           id_tipo: id_tipo
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                          console.info(quote);
                    });
                   this.CargaGrilla();
                  }
                }
              ]
            });
            alert.present();
             
        }

}
