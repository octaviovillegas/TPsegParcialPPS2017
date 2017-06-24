import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
 import { EncuestaAlumno } from '../../encuesta-alumno/encuesta-alumno';

@Component({
    selector: 'page-resultado',
    templateUrl: 'resultado.html',
})
export class Resultado
{

    constructor(public navCtrl: NavController, public viewCtrl:ViewController , public http:Http) {
    this.cargarEncuestas();

    }
 
    private encuestas = [];
    private cargando = false;

    verEncuesta(encuesta) {
        this.navCtrl.push(EncuestaAlumno, {encuesta: encuesta}, {
            direction: 'forward',
            animation: 'ios-transition'
        });

    }



    cargarEncuestas() {
            this.cargando = true;
            this.http.get("http://tppps2.hol.es/ws1/encuestas")
            .map(res => res.json())
            .subscribe((quote) =>{
                this.cargando = false;
                this.encuestas = quote; 
            }, e => {
                this.cargando = false;
            });
        }

    cancelar()
    {
        this.viewCtrl.dismiss();
    }


}
