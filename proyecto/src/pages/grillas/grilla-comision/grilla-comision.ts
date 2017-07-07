import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { AltaModal } from '../alta-modal/alta-modal';
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-grilla-comision',
  templateUrl: 'grilla-comision.html',
})
export class GrillaComision {

    cargando = false;
 micolor;
    Comisiones;
    Com : Array<any> =[];
      private usuarioLogueado;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth ,public navParams: NavParams, public viewCtrl: ViewController,
      private http: Http, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
    
         this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();
        this.CargaGrilla();
  }


traerMiEstilo()
{
  console.info(this.usuarioLogueado['id_usuario']);
  console.info(event);
   this.http.post("http://tppps2.hol.es/ws1/traerConfMiEstilo", {
            id_usuario:this.usuarioLogueado['id_usuario']
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);  
                        console.info(quote['estilo']);     
                        console.info(quote['nombre']);   
                        console.info(quote[0]['nombre']);   
                           if(quote[0]['nombre'] != "estilo1" && quote[0]['nombre'] != "estilo2" && quote[0]['nombre'] != "estilo3" && quote[0]['nombre'] != "estilo4")
                                {
                                this.micolor=quote[0]['codigocolor1']; 
                                }else{
                                this.micolor=quote[0]['nombre']; 
                                } 

                    });
                    
}
    CargaGrilla()
    {
        this.cargando = true;
          console.info("entro");
          this.Comisiones=null;
          this.Com=[];
            this.http.get("http://tppps2.hol.es/ws1/comisiones")
            .map(res => res.json())
            .subscribe((quote) =>{
                this.cargando = false;
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
                     this.cargando = true;

                          this.http.post("http://tppps2.hol.es/ws1/comisiones/modificar", {
                            id_comision: id_comision,
                            descripcion:data['descripcion']
                        })
                        .map(res => res.json())
                        .subscribe((quote) => {
                            this.cargando = false;
                            this.mostrarMensaje('Comisión modificada con éxito!');
                            this.CargaGrilla();
                        }, e => {
                            this.cargando = false;
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

                  this.cargando = true;
                          this.http.post("http://tppps2.hol.es/ws1/comisiones/alta", {
                            descripcion:data['descripcion']
                        })
                        .map(res => res.json())
                        .subscribe((quote) =>{
                            this.cargando = false;
                            this.mostrarMensaje('Comisión creada con éxito!');
                            this.CargaGrilla();
                        }, e => {
                            this.cargando = false;
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
                    this.cargando = true;
                    this.http.post("http://tppps2.hol.es/ws1/comisiones/eliminar", {
                           id_comision: id_comision

                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        this.cargando = false;
                        this.mostrarMensaje('Comisión eliminada con éxito!');
                           this.CargaGrilla();
                    }, e => {
                        this.cargando = false;
                    });

                  }
                }
              ]
            });
            alert.present();
    }

    abrirActionSheet (c) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Opciones',
            buttons: [
                {
                    text: 'Editar',
                    handler: () => {
                        this.Modificar(c.id_comision, c.descripcion);
                    }
                },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: () => {
                        this.Eliminar(c.id_comision, c.descripcion);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();
    }

    mostrarMensaje (mensaje) {
        let toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }


}
