import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import { Pregunta } from './pregunta';

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
    private pregunta_actual: Pregunta = null;
    private accion;

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: servicioAuth, private http: Http, public toastCtrl: ToastController) {
        this.encuesta = navParams.data.encuesta;
        this.accion = navParams.data.accion;
    }

    ionViewDidLoad() {
        if (this.accion == EncuestaPage.ACCION_VER) {
            let usuario = this.auth.getUserInfo();
            this.traerPreguntasConRespuestas(this.encuesta.id_encuesta, usuario.id_usuario).subscribe((preguntas) => this.preguntas = preguntas);
        } else if (this.accion == EncuestaPage.ACCION_RESPONDER) {
            this.traerPreguntas(this.encuesta.id_encuesta).subscribe((preguntas) => {
                this.preguntas = preguntas;

                if (this.preguntas.length > 0) {
                    this.pregunta_actual = this.preguntas[0];
                }
            });
        }
    }

    traerPreguntasConRespuestas(id_encuesta, id_usuario) {

        //return this.http.get('http://localhost/facultad/ws1/usuarios/'+id_usuario+'/encuestas/'+id_encuesta+'/preguntas').map(
        return this.http.get('http://tppps2.hol.es/ws1/usuarios/'+id_usuario+'/encuestas/'+id_encuesta+'/preguntas').map(
            res => res.json().preguntas
        );

    }

    traerPreguntas(id_encuesta) {

        //return this.http.get('http://localhost/facultad/ws1/encuestas/'+id_encuesta+'/preguntas').map(
        return this.http.get('http://tppps2.hol.es/ws1/encuestas/'+id_encuesta+'/preguntas').map(
            res => res.json().preguntas
        );

    }

    getRespuesta(pregunta) {
        console.log('respuesta_opcion: ' + pregunta.respuesta_opcion);
        console.log(pregunta['opcion'+pregunta.respuesta_opcion]);

        return pregunta['opcion'+pregunta.respuesta_opcion];
    }

    private checkboxs_checked = [false, false, false, false];
    onChecked(value, i, pregunta) {

        console.log(value);
        console.log(i);
        console.log(pregunta);

        /*if (typeof pregunta.respuesta_opcion == 'undefined') {
            pregunta.respuesta_opcion = [false, false, false, false];
        }*/

        /*pregunta.respuesta_opcion[i-1] = value.checked;*/
        this.checkboxs_checked[i-1] = value.checked;

        let valor = [];
        for(let j = 0; j < this.checkboxs_checked.length; j++) {

            if (this.checkboxs_checked[j]) {
                valor.push(pregunta['opcion'+(j+1)]);
            }
        }

        pregunta.respuesta_opcion = valor.join(', ');
    }

    estaSinResponder(pregunta: Pregunta) {

        let isUndefined = typeof pregunta.respuesta_opcion == 'undefined';

        if (pregunta.tipo == 'text') {
            return isUndefined || pregunta.respuesta_opcion.length <= 0;
        } else if (pregunta.tipo == 'radio') {
            return isUndefined || pregunta.respuesta_opcion == null;
        } else if (pregunta.tipo == 'checkbox') {
            return isUndefined || pregunta.respuesta_opcion.length <= 0;
            //return isUndefined || pregunta.respuesta_opcion.indexOf(true) == -1;
        } else if (pregunta.tipo == 'select') {
            return isUndefined || pregunta.respuesta_opcion == null;
        }

        return true;

    }

    siguientePregunta() {
        this.checkboxs_checked = [false, false, false, false];
        let indice_actual = this.preguntas.indexOf(this.pregunta_actual);

        if (indice_actual < this.preguntas.length - 1) {
            this.pregunta_actual = this.preguntas[++indice_actual];
        } else {
            console.log(this.preguntas);
            let usuario = this.auth.getUserInfo();

            this.guardarEncuesta(usuario.id_usuario, this.preguntas).subscribe(response => {
                this.mostrarMensaje('¡Gracias por participar de esta encuesta!');
                this.back();
            });
        }
    }

    guardarEncuesta(id_usuario, preguntas) {

        let respuestas = [];

        for (let i = 0; i < preguntas.length; i++) {

            let pregunta = preguntas[i];

            respuestas.push({
                id_pregunta: pregunta.id_pregunta,
                opcion: pregunta.respuesta_opcion
            });
        }


        //return this.http.post('http://localhost/facultad/ws1/usuarios/'+id_usuario+'/encuestas/respuestas', {respuestas: respuestas}).map(
        return this.http.post('http://tppps2.hol.es/ws1/usuarios/'+id_usuario+'/encuestas/respuestas', {respuestas: respuestas}).map(
            res => res.json()
        );

    }

    mostrarMensaje(mensaje) {
        let toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    back() {
        this.navCtrl.pop({
            direction: 'back',
            animation: 'ios-transition'
        });
    }

}
