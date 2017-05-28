import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { servicioAuth } from '../servicioAuth/servicioAuth';

/**
 * Generated class for the Encuesta page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {

    public static readonly ESTADO_PENDIENTE = 'pendiente';
    public static readonly ESTADO_COMPLETADA = 'completada';

    public static readonly ACCION_VER = 'ver';
    public static readonly ACCION_RESPONDER = 'responder';

    private encuesta;
    private preguntas;
    private accion;

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: servicioAuth, private http: Http) {
        this.encuesta = navParams.data.encuesta;
        this.accion = navParams.data.accion;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Encuesta');
        this.traerPreguntas(this.encuesta.id_encuesta).subscribe((preguntas) => this.preguntas = preguntas);
    }

    traerPreguntas(id_encuesta) {

        return this.http.get('http://localhost/facultad/ws1/encuestas/'+id_encuesta+'/preguntas').map(
            res => res.json().preguntas
        );

    }

    back() {
        this.navCtrl.pop({
            direction: 'back',
            animation: 'ios-transition'
        });
    }

}
