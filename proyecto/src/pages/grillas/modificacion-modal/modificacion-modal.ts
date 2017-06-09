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

    constructor (public navCtrl: NavController, public navParams: NavParams, htt:Http, public viewCtrl: ViewController, public auth: AuthData, private alertCtrl: AlertController)
    {
        this.c = navParams.data['clave'];
        this.n = navParams.data['nombre'];
        this.t = navParams.data['id_tipo'];
        this.u = navParams.data['usuario'];
        this.id_usuario = navParams.data['id_usuario'];
        this.http = htt;
    }

    Modificar(id_usuario, nombre, usuario, clave, id_tipo)
    {
        // Actualizo el usuario en la BD SQL
        this.http.post("http://tppps2.hol.es/ws1/usuarios/modificar", {
            id_usuario: id_usuario,
            id_tipo: id_tipo,
            clave: clave,
            nombre: nombre,
            usuario: usuario
        })
        .map(res => res.json())
        .subscribe((quote) =>{
            this.viewCtrl.dismiss();
        });

    }

    /**
     * Funcion que envia un mail al "email" pasado como parametro para resetear
     * la clave de firebase.
     * @param  {[type]} email [description]
     * @return {[type]}       [description]
     */
    resetearClave (email) {

        this.auth.resetPassword(email).then( r => {

            this.showMsg('Clave reseteada con exito', 'Se ha enviado un mail al usuario para que resetee la clave.');

        },
        (error: any) => {

            console.log('error');
            console.log(error);

            let errorMessage;

            switch (error.code) {
                case 'INVALID_EMAIL':
                case 'INVALID_USER':
                    errorMessage = 'Invalid email';
                break;
                default:
                    errorMessage = 'Error: [' + error.code + ']';
            }

            this.showMsg('Error al resetear la clave', errorMessage);

        });

    }

    showMsg(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
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
