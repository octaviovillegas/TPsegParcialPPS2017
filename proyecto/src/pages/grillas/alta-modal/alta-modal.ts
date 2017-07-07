import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import {Http} from '@angular/http'; 
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { Observable } from 'rxjs/Observable';
import { MediaCapture } from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from 'ionic-native';
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

    n = '';
    t;
    c = '';
    u = '';
    id_usuario;
    id_tip;
    id_tipo;

    base64Image;

    width = 320;
    height = 320;

    cargando = true;
 micolor;
   private usuarioLogueado;

    constructor(public authData:AuthData, public navCtrl: NavController, public navParams: NavParams, public http:Http, public viewCtrl: ViewController, public auth:servicioAuth, private alertCtrl: AlertController, private mediaCapture: MediaCapture, private imagePicker: ImagePicker)
    {
        console.log('navParams.data: ');
        console.log(navParams.data);
        this.t = navParams.data['tipo'];
        this.id_tipo = navParams.data['id_tipo'];

        this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();
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

    Alta(nombre, usuario, clave, id_tipo)
    {
        console.log('Alta: ' + id_tipo);

        if (nombre == null || nombre=="" ||usuario==null || usuario=="" || clave== null || clave=="" || id_tipo==null || id_tipo=="" ) {
            alert ("Debe completar todos los campos!");
        } else {
            this.cargando = true;

            // Creo el usuario en firebase`
            this.authData.signupUser(this.u, this.c).then((success) => {
                
                if (success) {

                    // Creo el usuario en la base de datos sql.
                    this.http.post("http://tppps2.hol.es/ws1/usuarios/alta", {
                        clave: this.c,
                        nombre: this.n,
                        usuario: this.u,
                        tipo: this.t,
                        id_tipo: id_tipo,
                        imagen: this.base64Image
                    })
                    .map(res => res.json())
                    .catch((error:any) => Observable.throw(error.json() || 'Server error'))
                    .subscribe((quote) =>{
                        this.cargando = false;
                        console.log('subscribe /usuarios/alta:');
                        console.info(quote);

                        if (quote.error == false) {
                            this.viewCtrl.dismiss(true);
                        } else {
                            this.showMsg('No se pudo crear el usuario en la base de datos.');
                        }

                    }, e => {
                        this.cargando = false;
                        this.showMsg('Error: ' + e.message);
                    });

                } else {
                    this.showMsg('No se pudo crear el usuario.');

                    this.cargando = false;
                }

            }).catch(e => {
                this.cargando = false;
                console.log('Catch signupUser: ');
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
        this.viewCtrl.dismiss(false);
    }


}
