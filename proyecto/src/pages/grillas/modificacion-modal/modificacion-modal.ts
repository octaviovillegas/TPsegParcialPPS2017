import { Component } from '@angular/core';
import { NavController, NavParams, NavOptions, ViewController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { AuthData } from '../../../providers/auth-data';
import { Camera } from 'ionic-native';
import { servicioAuth } from '../../servicioAuth/servicioAuth';

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
    micolor;
    width = 320;
    height = 320;
    base64Image;
    cargando = false;
    private usuarioLogueado;

    constructor (public sauth: servicioAuth, public navCtrl: NavController, public navParams: NavParams,public http:Http, public viewCtrl: ViewController, public auth: AuthData, private alertCtrl: AlertController)
    {
        this.usuarioLogueado = this.sauth.getUserInfo();
        this.traerMiEstilo();
        console.log(navParams['data']);
        this.c = navParams.data['clave'];
        this.n = navParams.data['nombre'];
        this.t = navParams.data['id_tipo'];
        this.u = navParams.data['usuario'];
        this.id_usuario = navParams.data['id_usuario'];
        this.base64Image = navParams.data['imagen'];
    
     
    }

 
traerMiEstilo()
{
  this.cargando = true;
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
                          this.cargando = false;
                      });
                    
}

    tomarFoto(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: this.width,
            targetHeight: this.height
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, (err) => {
            console.log('Camera.getPicture: ');
            console.log(err);
        });
    }

    Modificar(id_usuario, nombre, usuario, clave, id_tipo)
    {
        this.cargando = true;
        // Actualizo el usuario en la BD SQL
        this.http.post("http://tppps2.hol.es/ws1/usuarios/modificar", {
            id_usuario: id_usuario,
            id_tipo: id_tipo,
            clave: clave,
            nombre: nombre,
            usuario: usuario,
            imagen: this.base64Image
        })
        .map(res => res.json())
        .subscribe((quote) => {
            console.log('modificar response: ', quote);

            this.cargando = false;
            this.viewCtrl.dismiss(true);
        }, e => {
            this.cargando = false;
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
        this.viewCtrl.dismiss(false);
    }

}
