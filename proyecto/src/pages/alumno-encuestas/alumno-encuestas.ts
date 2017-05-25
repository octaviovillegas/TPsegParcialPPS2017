import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
* Generated class for the AlumnoEncuestasPage.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
    selector: 'page-alumno-encuestas',
    templateUrl: 'alumno-encuestas.html',
})
export class AlumnoEncuestasPage {

    public ESTADO_PENDIENTE = 'pendiente';
    public ESTADO_COMPLETADA = 'completada';

    private titulo: string;
    private tipo: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.tipo = navParams.data;

        if (this.tipo == this.ESTADO_PENDIENTE) {
            this.titulo = 'Pendientes';
        } else if (this.tipo == this.ESTADO_COMPLETADA) {
            this.titulo = 'Completadas';
        } else {
            this.titulo = 'Todas';
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AlumnoEncuestasPage');
    }

    back() {
        this.navCtrl.pop({
            direction: 'back',
            animation: 'ios-transition'
        });
    }

}
