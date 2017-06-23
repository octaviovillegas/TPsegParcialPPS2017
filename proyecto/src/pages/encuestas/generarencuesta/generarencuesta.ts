import { Component } from '@angular/core';
import 'rxjs/Rx';
import { NavController,NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import {Modales} from "../../encuestas/modales/modales";
import {Http} from '@angular/http';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { EncuestaDetalle } from "../../encuesta-detalle/encuesta-detalle";

@Component({
    selector: 'page-generarencuesta',
    templateUrl: 'generarencuesta.html'
})
export class GenerarEncuesta {

    private usuarioLogueado;
    private datos = {
        queHago:"",
        idEncuesta:Number
    };

    private listaPreguntas: Array<string>;
    private listaEncuestas;

    cargando = false;


    constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
        ,public NavParams: NavParams,private http: Http,servAuth:servicioAuth, public toastCtrl: ToastController)
        {
            this.usuarioLogueado = servAuth.getUserInfo();
            this.cargarEncuestas();
        }

        agregarPregunta(datos) {
            console.log(datos);
            this.datos.idEncuesta=datos;
            this.datos.queHago="AgregarPregunta";
            let modal = this.modalCtrl.create(Modales,this.datos);

            modal.onDidDismiss(data => {
                console.log('onDidDismiss: ', data);
                if (data) {
                    this.cargarEncuestas();
                    this.mostrarMensaje('Pregunta agregada con éxito!');
                }
            });

            modal.present();
        }

        cargarEncuestas() {
            this.cargando = true;
            this.http.get("http://tppps2.hol.es/ws1/encuestas")
            .map(res => res.json())
            .subscribe((quote) =>{
                this.cargando = false;
                this.listaEncuestas = quote;
                console.info(this.listaEncuestas);
            }, e => {
                this.cargando = false;
            });
        }

        nuevaEncuesta(){
            this.datos.queHago = "AgregarEncuesta";
            let modal = this.modalCtrl.create(Modales, this.datos);

            modal.onDidDismiss(data => {
                console.log('onDidDismiss: ', data);
                if (data) {
                    this.cargarEncuestas();
                    this.mostrarMensaje('Encuesta agregada con éxito!');
                }
            });

            modal.present();

        }

        BorrarEncuesta(datos){
            console.log(datos);
            this.cargando = true;
            this.http.post("http://tppps2.hol.es/ws1/encuestas/borrar", {
                idEncuesta:datos
            })
            .map(res => res.json())
            .subscribe((quote) =>{
                this.cargando = false;
                this.cargarEncuestas();
                this.mostrarMensaje('Encuesta borrada con éxito!');
                console.info(quote);
            }, e => {
                this.cargando = false;
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

        verEncuesta (encuesta) {
            this.navCtrl.push(EncuestaDetalle, encuesta, {
                direction: 'forward',
                animation: 'ios-transition'
            });
        }



    }
