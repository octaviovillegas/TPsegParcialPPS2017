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
    selector: 'page-alta-modal',
    templateUrl: 'alta-modal.html',
})
export class AltaModal
{

    n;
    t;
    c;
    u;
    id_usuario;
    id_tip;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,
        public viewCtrl: ViewController, public auth: AuthData, private alertCtrl: AlertController)
    {
        this.t = navParams.data['tipo'];
    }

    Alta(nombre, usuario, clave, id_tipo)
    {

        if(nombre == null || nombre=="" ||usuario==null || usuario=="" || clave== null || clave=="" || id_tipo==null || id_tipo=="" )
        {
            alert ("Debe completar todos los campos!");
        }
        else{

            // Creo el usuario en firebase`
            this.auth.signupUser(this.u, this.c).then((success) => {

                if (success) {

                    // Creo el usuario en la base de datos sql.
                    this.http.post("http://tppps2.hol.es/ws1/usuarios/alta", {
                        clave: this.c,
                        nombre: this.n,
                        usuario: this.u,
                        id_tipo: this.t
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);
                        this.viewCtrl.dismiss();
                    });

                } else {
                    this.showMsg('No se pudo crear el usuario.');
                }

            }).catch(e => {
                console.log(e);
                this.showMsg(e);
            });

        }

    }

    showMsg(text) {
        let alert = this.alertCtrl.create({
            title: 'Error al crear el usuario',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    cancelar()
    {
        this.viewCtrl.dismiss();
    }


}
