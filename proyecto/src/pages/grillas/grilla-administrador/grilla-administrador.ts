import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { AltaModal } from '../alta-modal/alta-modal';
import { ModalController } from 'ionic-angular';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { ActionSheetController } from 'ionic-angular';


@Component({
    selector: 'page-grilla-administrador',
    templateUrl: 'grilla-administrador.html',
})
export class GrillaAdministrador
{

    cargando = false;
    usuarios = [];
 micolor;
 usuarioLogueado;
 
    constructor(private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth ,public navParams: NavParams, public viewCtrl: ViewController ,private http: Http, public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController)
    {
        
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
        this.usuarios = [];

        this.http.get("http://tppps2.hol.es/ws1/usuarios")
        .map(res => res.json())
        .subscribe((quote) => {

            this.usuarios = quote.filter( u => {
                return u.id_tipo == 1; // Administrador
            });

            this.cargando = false;

        });

    }

    Modificar(id_usuario, usuario, nombre, clave, id_tipo, imagen)
    {
        let usM = {
            id_usuario: id_usuario,
            usuario: usuario,
            nombre: nombre,
            clave: clave,
            id_tipo: id_tipo,
            imagen: imagen
        };
        let modal = this.modalCtrl.create(ModificacionModal, usM);
        modal.onDidDismiss(data => {
            if (data) {
                this.CargaGrilla();
                this.mostrarMensaje('Usuario modificado con éxito!');
            }
        });
        modal.present();

    }

    Alta()
    {
        let modal2 = this.modalCtrl.create(AltaModal, {
            "tipo": "Administrador",
            id_tipo: 1
        });
        modal2.onDidDismiss(data => {
            if (data == true) {
                this.CargaGrilla();
                this.mostrarMensaje('Usuario creado con éxito!');
            }
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
                        this.cargando = true;
                        this.http.post("http://tppps2.hol.es/ws1/usuarios/eliminar", {
                            id_usuario: id_usuario

                        })
                        .map(res => res.json())
                        .subscribe((quote) => {
                            this.cargando = false;
                            this.CargaGrilla();
                        });

                    }
                }
            ]
        });
        alert.present();

    }

    abrirActionSheet (usr) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Opciones',
            buttons: [
                {
                    text: 'Editar',
                    handler: () => {
                        this.Modificar(usr.id_usuario, usr.usuario, usr.nombre, usr.clave, usr.id_tipo, usr.imagen);
                    }
                },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: () => {
                        this.Eliminar(usr.id_usuario, usr.usuario, usr.nombre, usr.clave, usr.id_tipo);
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
