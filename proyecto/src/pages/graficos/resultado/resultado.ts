import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
 import { EncuestaAlumno } from '../../encuesta-alumno/encuesta-alumno';
import { servicioAuth } from '../../servicioAuth/servicioAuth';

@Component({
    selector: 'page-resultado',
    templateUrl: 'resultado.html',
})
export class Resultado
{
    private usuarioLogueado;
    private encuestas = [];
    private cargando = false;
    micolor;
    
    constructor(public auth:servicioAuth , public navCtrl: NavController, public viewCtrl:ViewController , public http:Http) {
    
         this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();
        this.cargarEncuestas();

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
