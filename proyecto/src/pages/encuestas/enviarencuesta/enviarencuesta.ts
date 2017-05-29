import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Http} from '@angular/http';
import { servicioAuth } from '../../servicioAuth/servicioAuth';

@Component({
  selector: 'page-Encuestas',
  templateUrl: 'enviarencuesta.html'
})
export class EnviarEncuesta {
    private usuarioLogueado;
        private datos = {
          queHago:"",
          idEncuesta:Number
        };
private listaPreguntas: Array<string>;
private listaTipo: Array<string>;
private listaEncuestas;
private listaCursos;
private cursoSeleccionado;
private encuestaSeleccionada;

 constructor(public navCtrl: NavController,public NavParams: NavParams,private http: Http,public af: AngularFire
 ,servAuth:servicioAuth)
  {
this.usuarioLogueado=servAuth.getUserInfo();
    console.info(this.usuarioLogueado);
 
  this.http.get("http://tppps2.hol.es/ws1/cursos")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaCursos = quote;
    console.info(this.listaCursos);
  });
  this.http.get("http://tppps2.hol.es/ws1/encuestas")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaEncuestas = quote;
    console.info(this.listaEncuestas);
  });
  
  }
  

EnviarEncuesta(){
  this.http.post("http://tppps2.hol.es/ws1/encuestas/enviar", {
     idEncuesta:this.encuestaSeleccionada,
     idCurso:this.cursoSeleccionado
     })
    .map(res => res.json())
    .subscribe((quote) =>{
      console.info(quote);
     });


}

}

