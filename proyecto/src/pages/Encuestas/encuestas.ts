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
        private queHago = {
          tipo:"",
          pregunta:""
        };
        private pregunta;
private listaPreguntas: Array<string>;
private listaTipo: Array<string>;
private listaEncuestas;
private listaCursos;
private cursoSeleccionado;

 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
,public NavParams: NavParams,private http: Http)
  {
  this.usuarioLogueado = NavParams;
  this.http.get("http://tppps2.hol.es/ws1/cursos")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaCursos = quote;
    console.info(this.listaCursos);
  });
  }
    agregarTextbox(){
      this.queHago.tipo = "text";
        let modal = this.modalCtrl.create(Modales,this.queHago);
        modal.present();
    }
    
     agregarSelect(){
      this.queHago.tipo = "select";
      console.log(this.queHago);
        let modal = this.modalCtrl.create(Modales,this.queHago);
        modal.present();
     console.info(modal);
    }
    public setPregunta(){
      
    }


}

