import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { AltaModal } from '../alta-modal/alta-modal';


@Component({
  selector: 'page-grilla-comision',
  templateUrl: 'grilla-comision.html',
})
export class GrillaComision {

    Comisiones;
    Com : Array<any> =[];
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth ,public navParams: NavParams, public viewCtrl: ViewController ,private http: Http, public modalCtrl: ModalController) {
    this.CargaGrilla();

  }


    CargaGrilla()
    {
          console.info("entro");
          this.Comisiones=null;
          this.Com=[];
            this.http.get("http://tppps2.hol.es/ws1/comisiones")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Comisiones = quote;
            console.info(quote);
            for(let us of this.Comisiones)
              {
                  this.Com.push(us);  
              }

            });

    }

  
 

  Modificar(id_comision, descripcion)
  {
          let alert = this.alertCtrl.create({
            title: 'Modificar descripcion',
            inputs: [
              {
                name: 'descripcion',
                placeholder: 'descripcion',
                value:descripcion
              } 
            ],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Aceptar',
                handler: data => {
                 console.info(id_comision, data['descripcion']);

                          this.http.post("http://tppps2.hol.es/ws1/comisiones/modificar", {
                            id_comision: id_comision,
                            descripcion:data['descripcion']
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



    Alta(descripcion)
    {
       
          let alert = this.alertCtrl.create({
            title: 'Nueva comision',
            inputs: [
              {
                name: 'descripcion',
                placeholder: 'descripcion'
              } 
            ],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Aceptar',
                handler: data => {
                  console.info(data);
                   
                          this.http.post("http://tppps2.hol.es/ws1/comisiones/alta", {
                            descripcion:data['descripcion']
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

    Eliminar(id_comision, descripcion)
    {
             let alert = this.alertCtrl.create({
              title: 'Eliminacion de usuario',
              message: 'Confirma eliminar comision: '+ descripcion,
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
                    this.http.post("http://tppps2.hol.es/ws1/comisiones/eliminar", {
                           id_comision: id_comision
            
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
