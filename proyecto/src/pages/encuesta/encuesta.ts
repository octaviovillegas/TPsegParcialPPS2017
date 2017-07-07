import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import { Pregunta } from './pregunta';
import { Events } from 'ionic-angular';

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
    private cargando = false;
    private ocultarSiguientePregunte = false;
    usuarioLogueado;
 micolor;
    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: servicioAuth, private http: Http, public toastCtrl: ToastController, private events: Events) {
        this.encuesta = navParams.data.encuesta;
        this.accion = navParams.data.accion;
        this.ocultarSiguientePregunte = false;
           this.usuarioLogueado = this.auth.getUserInfo();
 
      
        this.traerMiEstilo();
    }


traerMiEstilo()
{
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

                    });
                    
}
    ionViewDidLoad() {
        if (this.accion == EncuestaPage.ACCION_VER) {
            this.cargando = true;
            let usuario = this.auth.getUserInfo();
            this.traerPreguntasConRespuestas(this.encuesta.id_encuesta, usuario.id_usuario).subscribe((preguntas) => {
                this.preguntas = preguntas;
                this.cargando = false;
            });
        } else if (this.accion == EncuestaPage.ACCION_RESPONDER) {
            this.cargando = true;
            this.traerPreguntas(this.encuesta.id_encuesta).subscribe((preguntas) => {
                this.preguntas = preguntas;
                    this.cargando = false;

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

    private checkboxs_checked = [false, false, false, false];
    onChecked(value, i, pregunta) {

        this.checkboxs_checked[i-1] = value.checked;

        let valor = [];
        for(let j = 0; j < this.checkboxs_checked.length; j++) {

            if (this.checkboxs_checked[j]) {
                valor.push(pregunta['opcion'+(j+1)]);
            }
        }

        pregunta.respuesta_opcion = valor.join(',');
    }

    estaSinResponder(pregunta: Pregunta) {

        let isUndefined = typeof pregunta.respuesta_opcion == 'undefined';

        if (pregunta.tipo == 'text') {
            return isUndefined || pregunta.respuesta_opcion.length <= 0;
        } else if (pregunta.tipo == 'radio') {
            return isUndefined || pregunta.respuesta_opcion == null;
        } else if (pregunta.tipo == 'checkbox') {
            return isUndefined || pregunta.respuesta_opcion.length <= 0;
        } else if (pregunta.tipo == 'select') {
            return isUndefined || pregunta.respuesta_opcion == null;
        }

        return true;

    }

    siguientePregunta() {

        for (let i = 0; i < this.checkboxs_checked.length; i++) {
            this.checkboxs_checked[i] = false;
        }

        let indice_actual = this.preguntas.indexOf(this.pregunta_actual);

        if (indice_actual < this.preguntas.length - 1) {
            this.pregunta_actual = this.preguntas[++indice_actual];

        } else {
            let usuario = this.auth.getUserInfo();

            this.cargando = true;
            this.guardarEncuesta(usuario.id_usuario, this.preguntas).subscribe(response => {
                this.cargando = false;
                this.mostrarMensaje('¡Gracias por participar de esta encuesta!');
                this.events.publish('encuestas:refresh', true);
                this.back();
            }, error => {
                this.cargando = false;
                this.mostrarMensaje('Hubo un error al procesar su encuesta. Vuelva a intentarlo.');
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
