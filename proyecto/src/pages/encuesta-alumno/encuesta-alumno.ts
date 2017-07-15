import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
 import { servicioAuth } from '../servicioAuth/servicioAuth';


@Component({
  selector: 'page-encuesta-alumno',
  templateUrl: 'encuesta-alumno.html',
})
export class EncuestaAlumno { 

cargando;
id_encuesta;
alu=[];
resul=[];
prre=[];
titulo;
 micolor;
   private usuarioLogueado;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public auth: servicioAuth) {
  
    console.info(navParams.data['encuesta']['id_encuesta']);
    console.info(navParams.data['encuesta']);
    this.titulo=navParams.data['encuesta']['descripcion'];
    this.id_encuesta=navParams.data['encuesta']['id_encuesta'];
      this.cargarAlumno();
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

 cargarAlumno()
 {
   this.http.get("http://tppps2.hol.es/ws1/encuestas/"+this.id_encuesta+"/alumnos")
            .map(res => res.json())
            .subscribe((quote) =>{
                this.cargando = false;
               console.info(quote['alumnos']);
               for(let a of quote['alumnos'])
               {
                 console.info(a['nombre']);
                 if(!this.alu.some(x=>x==a['nombre'])){
                  this.alu.push(a.nombre);
                 }
               }

               for(let nom of this.alu)
               {
                 this.prre=[];

                  for(let a of quote['alumnos'])
                  {
                    if(nom== a['nombre'])
                    {
                      this.prre.push({pregunta: a['pregunta'], opcion:a['opcion']});

                    }
                  }
                  this.resul.push({alumno:nom, pregyresp:this.prre});
               }
               console.info(this.resul);
            }, e => {
                this.cargando = false;
            });
 }

}
