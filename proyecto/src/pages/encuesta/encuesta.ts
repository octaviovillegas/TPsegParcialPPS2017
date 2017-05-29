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
        if (this.accion == EncuestaPage.ACCION_VER) {
            let usuario = this.auth.getUserInfo();
            this.traerPreguntasConRespuestas(this.encuesta.id_encuesta, usuario.id_usuario).subscribe((preguntas) => this.preguntas = preguntas);
        } else if (this.accion == EncuestaPage.ACCION_RESPONDER) {
            this.traerPreguntas(this.encuesta.id_encuesta).subscribe((preguntas) => this.preguntas = preguntas);
        }
    }

    traerPreguntasConRespuestas(id_encuesta, id_usuario) {

        return this.http.get('http://tppps2.hol.es/ws1/usuarios/'+id_usuario+'/encuestas/'+id_encuesta+'/preguntas').map(
            res => res.json().preguntas
        );

    }

    traerPreguntas(id_encuesta) {

        return this.http.get('http://tppps2.hol.es/ws1/encuestas/'+id_encuesta+'/preguntas').map(
            res => res.json().preguntas
        );

    }

    getRespuesta(pregunta) {
        console.log('respuesta_opcion: ' + pregunta.respuesta_opcion);
        console.log(pregunta['opcion'+pregunta.respuesta_opcion]);

        return pregunta['opcion'+pregunta.respuesta_opcion];
    }

    onChecked(value, i, pregunta) {

        console.log(value);
        console.log(i);
        console.log(pregunta);

        if (typeof pregunta.respuesta_opcion == 'undefined') {
            pregunta.respuesta_opcion = [false, false, false, false];
        }

        pregunta.respuesta_opcion[i-1] = value.checked;
    }

    back() {
        this.navCtrl.pop({
            direction: 'back',
            animation: 'ios-transition'
        });
    }

}
