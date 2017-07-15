import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Pregunta } from '../encuesta/pregunta';
import {Modales} from "../encuestas/modales/modales";
import { servicioAuth } from '../servicioAuth/servicioAuth';

/**
* Generated class for the EncuestaDetalle page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
    selector: 'page-encuesta-detalle',
    templateUrl: 'encuesta-detalle.html',
})
export class EncuestaDetalle {

    private encuesta: any;
    private preguntas = [];
    private toggle = [];
    private cargando = true;
 micolor;
 
  private usuarioLogueado;
    constructor(public auth: servicioAuth, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, private http: Http, public toastCtrl: ToastController, public modalCtrl: ModalController) {
        console.log('EncuestaDetalle: ', navParams.data);

        this.encuesta = navParams.data;

        if (this.encuesta.id_encuesta > 0) {
            this.cargarPreguntas();
        }

           this.usuarioLogueado = this.auth.getUserInfo();      
        this.traerMiEstilo();
    }

   dismiss() {

        this.viewCtrl.dismiss();

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



    ionViewDidLoad() {
        console.log('ionViewDidLoad EncuestaDetalle');
    }

    cargarPreguntas() {
 
        this.preguntas = [];
        this.http.get('http://tppps2.hol.es/ws1/encuestas/'+this.encuesta.id_encuesta+'/preguntas')
        .map(res => res.json().preguntas)
        .subscribe((preguntas) => {
            console.log('Preguntas: ', preguntas);
            this.preguntas = preguntas;
 
        }, e => {
   
        });

    }

    crearPregunta () {

        let datos = {
            idEncuesta: this.encuesta.id_encuesta,
            queHago: 'AgregarPregunta'
        }

        let modal = this.modalCtrl.create(Modales, datos);

        modal.onDidDismiss(data => {

            if (data) {
                this.mostrarMensaje('Pregunta agregada con éxito!');
                this.cargarPreguntas();
            }

        });

        modal.present();

    }

    eliminarPregunta (id_pregunta) {

        this.cargando = true;

        this.http.delete('http://tppps2.hol.es/ws1/pregunta/'+id_pregunta)
        .map(r => r.json())
        .subscribe(data => {
            this.mostrarMensaje('Pregunta eliminada existosamente!');
            this.cargarPreguntas();
        });

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
