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
    micolor;
    micolor2;
    cargando = true;
    rutaico;
    icoE;
    icoN;

    constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
        ,public NavParams: NavParams,private http: Http,servAuth:servicioAuth, public toastCtrl: ToastController)
        {
            this.usuarioLogueado = servAuth.getUserInfo();
           
               this.traerMiEstilo();
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
                                    console.info("codcol");
                                this.micolor=quote[0]['codigocolor1']; 
                                }else{
                                this.micolor=quote[0]['nombre']; 
                                   console.info("nombre");
                                }
                        this.micolor2=quote[0]['codigocolor2'];
                        this.rutaico=quote[0]['rutaIcono'];
                        this.icoE= this.rutaico+"nueva_pregunta.png";
                        this.icoN=this.rutaico+"eliminar_encuesta.png";
                    });
                    
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
            console.info("aca entra");
            this.navCtrl.push(EncuestaDetalle, encuesta, {
                direction: 'forward',
                animation: 'ios-transition'
            });
        }



    }
