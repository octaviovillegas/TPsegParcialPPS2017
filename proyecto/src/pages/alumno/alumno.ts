import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AlumnoEncuestasPage } from "../alumno-encuestas/alumno-encuestas";
import { EncuestaPage } from '../encuesta/encuesta';
/**
 * Generated class for the Alumno page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-alumno',
  templateUrl: 'alumno.html'
})
export class Alumno {

    private usuarioLogueado;
    private encuestas = [];
    micolor;
    cargando = true;
    
    constructor (public navCtrl: NavController, private auth: servicioAuth, public navParams: NavParams, private http: Http, private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController) {
        this.usuarioLogueado = this.auth.getUserInfo();

        this.traerMiEstilo();
    }

    ionViewDidLoad () {
        console.log('ionViewDidLoad Alumno');
    }

    public verEncuestas (tipo) : void {

        this.navCtrl.push(AlumnoEncuestasPage, tipo, {
            direction: 'forward',
            animation: 'ios-transition'
        });

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

    public escanearEncuesta () {

        this.barcodeScanner.scan().then((barcodeData) => {
            console.log('BarcodeData: ', barcodeData);

            if (!barcodeData.cancelled && barcodeData.text.length > 0 && barcodeData.text.indexOf('encuesta') != -1) {

                this.buscarEIrALaEncuesta(barcodeData.text);

            }
            // Success! Barcode data is here
        }, (err) => {
            console.log('BarcodeData error: ', err);
            // An error occurred
        });

    }

    public buscarEIrALaEncuesta (data) {

        let parts = data.split(':');
        let id_encuesta = parts.length > 1 ? parts[1] : -1;

        this.getEncuestaByIdEncuesta(id_encuesta).subscribe(encuesta => {

            console.log('encuesta');
            console.log(encuesta);

            if (encuesta != false) {

                let accion = encuesta.estado == EncuestaPage.ESTADO_PENDIENTE ?
                            EncuestaPage.ACCION_RESPONDER : EncuestaPage.ACCION_VER;

                this.navCtrl.push(EncuestaPage, {encuesta: encuesta, accion: accion}, {
                    direction: 'forward',
                    animation: 'ios-transition'
                });

            } else {
                this.mostrarMensaje('La encuesta no esta asignada al usuario o no existe.', 5000, 'bottom');
            }

        },
        e => {
            // error
            this.mostrarMensaje('Error: ' + e.message, 5000, 'bottom');
        });

    }

    private getEncuestaByIdEncuesta (id_encuesta) {

        let user = this.auth.getUserInfo();

        return this.http.get('http://tppps2.hol.es/ws1/usuarios/' + user.id_usuario + '/encuestas/' + id_encuesta).map(
            res => res.json().encuesta
        );

    }

    mostrarMensaje(mensaje, duracion = 3000, posicion = 'top') {
        let toast = this.toastCtrl.create({
            message: mensaje,
            duration: duracion,
            position: posicion
        });
        toast.present();
    }

}
