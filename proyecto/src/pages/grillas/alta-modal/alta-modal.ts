import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ViewController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { AuthData } from '../../../providers/auth-data';
import {Observable} from 'rxjs/Observable';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from 'ionic-native';

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

    cargando = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,
        public viewCtrl: ViewController, public auth: AuthData, private alertCtrl: AlertController, private mediaCapture: MediaCapture,
    private imagePicker: ImagePicker)
    {
        console.log('navParams.data: ');
        console.log(navParams.data);
        this.t = navParams.data['tipo'];
        this.id_tipo = navParams.data['id_tipo'];
    }

    elegirFoto () {
        let options = {
            maximumImagesCount: 1,
            width: this.width,
            height: this.height,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
        };

        this.imagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                this.base64Image = this.encodeImageUri(results[i]);
                console.log('Image URI: ' + results[i]);
                console.log('base64: ' + this.encodeImageUri(results[i]));
            }
        }, (error) => {
            console.log('error imagePicker: ');
            console.log(error);
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

    encodeImageUri (imageUri) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();

        let s = this;
        img.onload = function(){
            c.width = s.width;
            c.height = s.height;
            ctx.drawImage(img, 0,0);
        };
        img.src = imageUri;
        var dataURL = c.toDataURL("image/jpeg");
        return dataURL;
    }

    Alta(nombre, usuario, clave, id_tipo)
    {
        console.log('Alta: ' + id_tipo);

        if (nombre == null || nombre=="" ||usuario==null || usuario=="" || clave== null || clave=="" || id_tipo==null || id_tipo=="" )
        {
            alert ("Debe completar todos los campos!");
        }
        else{
            this.cargando = true;

            // Creo el usuario en firebase`
            this.auth.signupUser(this.u, this.c).then((success) => {

                this.cargando = false;

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
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
                    .subscribe((quote) =>{
                        console.log('subscribe /usuarios/alta:');
                        console.info(quote);

                        if (quote.error == false) {
                            this.viewCtrl.dismiss();
                        } else {
                            this.showMsg('No se pudo crear el usuario en la base de datos.');
                        }

                    });

                } else {
                    this.showMsg('No se pudo crear el usuario.');
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
