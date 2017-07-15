import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import { EncuestaPage } from '../encuesta/encuesta';
import { Events } from 'ionic-angular';

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

    private titulo: string;
    private estado: string;
    private encuestas = [];
    private cargando = true;
 micolor;
 usuarioLogueado;
    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: servicioAuth, private http: Http, private events: Events) {
        this.estado = navParams.data;

        if (this.estado == EncuestaPage.ESTADO_PENDIENTE) {
            this.titulo = 'Pendientes';
        } else if (this.estado == EncuestaPage.ESTADO_COMPLETADA) {
            this.titulo = 'Completadas';
        } else {
            this.titulo = 'Todas';
        }

        this.events.subscribe('encuestas:refresh', (success) => {

            if (success) {
                this.ionViewDidLoad();
            }

        });

        this.cargarEncuestas();
           this.usuarioLogueado = this.auth.getUserInfo();
 
      
        this.traerMiEstilo();
    }

    cargarEncuestas () {
   
        this.encuestas = [];
        this.getEncuestasByEstado(this.estado).subscribe((encuestas) => {
            console.log(encuestas);
            this.encuestas = encuestas;
     
        });
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
        console.log('ionViewDidLoad AlumnoEncuestasPage');
    }

    getEncuestasByEstado(estado) {

        let user = this.auth.getUserInfo();

        return this.http.get('http://tppps2.hol.es/ws1/usuarios/'+user.id_usuario+'/encuestas?estado=' + estado).map(
            res => res.json().encuestas
        );

    }

    verOResponderEncuesta(encuesta) {

        if (this.estado == EncuestaPage.ESTADO_PENDIENTE) {
            this.comenzarEncuesta(encuesta);
        } else if (this.estado == EncuestaPage.ESTADO_COMPLETADA) {
            this.verEncuesta(encuesta);
        }

    }

    comenzarEncuesta(encuesta) {
        this.navCtrl.push(EncuestaPage, {encuesta: encuesta, accion: EncuestaPage.ACCION_RESPONDER}, {
            direction: 'forward',
            animation: 'ios-transition'
        });
    }

    verEncuesta(encuesta) {
        this.navCtrl.push(EncuestaPage, {encuesta: encuesta, accion: EncuestaPage.ACCION_VER}, {
            direction: 'forward',
            animation: 'ios-transition'
        });

    }

    back() {
        this.navCtrl.pop({
            direction: 'back',
            animation: 'ios-transition'
        });
    }

}
