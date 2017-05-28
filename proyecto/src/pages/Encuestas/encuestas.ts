import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalController, ViewController } from 'ionic-angular';
import {Modales} from "../encuestas/modales/modales";
import {Http} from '@angular/http';

@Component({
  selector: 'page-Encuestas',
  templateUrl: 'encuestas.html'
})
export class Encuestas {
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

 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
,public NavParams: NavParams,private http: Http,public af: AngularFire)
  {
  this.http.get("http://tppps2.hol.es/ws1/cursos")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaCursos = quote;
    console.info(this.listaCursos);
  });

    this.usuarioLogueado = NavParams;
  this.http.get("http://tppps2.hol.es/ws1/encuestas")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaEncuestas = quote;
    console.info(this.listaEncuestas);
  });
  
  }
    agregarPregunta(datos){
      console.log(datos);
            this.datos.idEncuesta=datos;
      this.datos.queHago="AgregarPregunta";
       let modal = this.modalCtrl.create(Modales,this.datos);
      modal.present(); 
    }
    
   nuevaEncuesta(){
      this.datos.queHago="AgregarEncuesta";
       let modal = this.modalCtrl.create(Modales,this.datos);
      modal.present(); 
   }

    cursoSelecionado(){
      
   console.log(this.cursoSeleccionado);
    }


}

