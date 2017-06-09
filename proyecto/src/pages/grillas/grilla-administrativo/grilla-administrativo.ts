import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { AltaModal } from '../alta-modal/alta-modal';

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

    CargaGrilla()
    {
          console.info("entro");
          this.Usuarios=null;
          this.UssAdm=[];
            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Usuarios = quote;

            for(let us of this.Usuarios)
              {
                if(us['tipo_usuario'] == "Administrativo")
                {
                  this.UssAdm.push(us);
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
          this.CargaGrilla();
        });
        modal.present();

    }

    Alta()
    {
        let modal2 = this.modalCtrl.create(AltaModal, {
            "tipo": "Administrativo",
            id_tipo: 2
        });
        modal2.onDidDismiss(data=>{
          this.CargaGrilla();
        });
        modal2.present();
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
                           id_usuario: id_usuario

                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                           this.CargaGrilla();
                    });

                  }
                }
              ]
            });
            alert.present();

    }

}
