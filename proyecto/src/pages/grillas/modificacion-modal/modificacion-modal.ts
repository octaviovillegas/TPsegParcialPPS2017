import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ViewController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { AuthData } from '../../../providers/auth-data';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http,
        public viewCtrl: ViewController, public auth: AuthData, private alertCtrl: AlertController)
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
            // Creo el usuario en firebase`
            this.auth.updateUserNombre(nombre).then( _ => {
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


            }).catch(e => {
                console.log(e);
                this.showMsg(e);
            });

        }

        showMsg(text) {
            let alert = this.alertCtrl.create({
                title: 'Error al crear el usuario',
                subTitle: text,
                buttons: ['OK']
            });
            alert.present(prompt);
        }

        Cancelar()
        {
            this.viewCtrl.dismiss();
        }

    }
