import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModal } from '../modificacion-modal/modificacion-modal';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { AltaModal } from '../alta-modal/alta-modal';
import { ActionSheetController } from 'ionic-angular';


@Component({
    selector: 'page-grilla-alumno',
    templateUrl: 'grilla-alumno.html',
})
export class GrillaAlumno {

    cargando = false;

    usuarios = [];
    Uss : Array<any> =[];
    constructor(private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth,
        public navParams: NavParams, public viewCtrl: ViewController ,private http: Http, public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {

            this.CargaGrilla();

        }

        CargaGrilla()
        {
            this.cargando = true;
            console.info("entro");
            this.usuarios = [];

            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
                this.cargando = false;

                this.usuarios = quote.filter( u => {
                    return u.id_tipo == 3; // Alumnos
                });

            }, e => {
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
                if (data != false) {
                    this.CargaGrilla();
                } else if (data == true) {
                    this.mostrarMensaje('Usuario modificado con éxito!');
                }
            });
            modal.present();

        }

        Alta()
        {
            let modal2 = this.modalCtrl.create(AltaModal, {
                tipo: "Alumno",
                id_tipo: 3
            });
            modal2.onDidDismiss(data => {
                if (data != false) {
                    this.CargaGrilla();
                } else if (data == true) {
                    this.mostrarMensaje('Usuario creado con éxito!');
                }
            });
            modal2.present();
        }

        Eliminar(id_usuario, usuario, nombre, clave, id_tipo)
        {
            let alert = this.alertCtrl.create({
                title: 'Eliminacion de usuario',
                message: 'Confirma eliminar usuario '+ usuario + '?',
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
                            .subscribe((quote) =>{
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
