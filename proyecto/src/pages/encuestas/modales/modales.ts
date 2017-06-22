import { Component } from '@angular/core';
import 'rxjs/Rx';
import { NavController,NavParams, ToastController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import {Http} from '@angular/http';

@Component({
    selector: 'page-Modales',
    templateUrl: 'modales.html'
})

export class Modales {
    private datos = {
        queHago:"",
        idEncuesta:Number
    };
    private encuesta={
        descripcion:"",
        fechaInicio:"",
        fechaFin:""
    }
    private veoPreguntas=false;
    private idEncuesta;
    private tipoPregunta = '';
    private veoEncuesta=false;
    private opcion1;
    private opcion2;
    private opcion3;
    private opcion4;
    private pregunta = '';

    cargando = false;

    constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController, public NavParams: NavParams, private http: Http, public toastCtrl: ToastController) {
        this.datos = NavParams.data;
        this.idEncuesta=this.datos.idEncuesta;
        console.info(this.datos);

        if(this.datos.queHago == "AgregarPregunta") {
            this.veoPreguntas=true;
        } else if(this.datos.queHago == "AgregarEncuesta") {
            this.veoEncuesta =true;
        }
    }

    dismiss() {

        this.veoEncuesta =false;
        this.veoPreguntas=false;
        this.viewCtrl.dismiss(false);

    }

    altaEncuesta() {

        this.cargando = true;
        console.info(this.encuesta);

        this.http.post("http://tppps2.hol.es/ws1/encuestas/alta", {
            descripcion:this.encuesta.descripcion,
            fechaInicio:this.encuesta.fechaInicio,
            fechaFin:this.encuesta.fechaFin
        })
        .map(res => res.json())
        .subscribe((quote) => {
            console.info(quote);
            this.cargando = false;
            this.viewCtrl.dismiss(true);
        }, e => {
            this.mostrarMensaje('Hubo un error al guardar la encuesta. Intente de nuevo.');
            this.cargando = false;
        });

    }

    altaPregunta() {

        this.cargando = true;

        console.log(this.idEncuesta);

        if(this.tipoPregunta =="1") {
            this.tipoPregunta ="text";
        } else if(this.tipoPregunta =="2") {
            this.tipoPregunta ="radio";
        } else if(this.tipoPregunta =="3") {
            this.tipoPregunta ="checkbox";
        }

        this.http.post("http://tppps2.hol.es/ws1/pregunta/alta", {
            idEncuesta:this.idEncuesta,
            tipo:this.tipoPregunta,
            pregunta:this.pregunta,
            opcion1:this.opcion1,
            opcion2:this.opcion2,
            opcion3:this.opcion3,
            opcion4:this.opcion4
        })
        .map(res => res.json())
        .subscribe((quote) => {
            this.cargando = false;
            console.info(quote);
            this.viewCtrl.dismiss(true);
        }, e => {
            this.mostrarMensaje('Hubo un error al guardar la pregunta. Intente de nuevo.');
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


}
