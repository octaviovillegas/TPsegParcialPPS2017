import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalController, ViewController } from 'ionic-angular';
import {Modales} from "../../encuestas/modales/modales";
import {Http} from '@angular/http';
import { servicioAuth } from '../../servicioAuth/servicioAuth';

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
private listaTipo: Array<string>;
private listaEncuestas;
private listaCursos;
private cursoSeleccionado;
private encuestaSeleccionada;


 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
,public NavParams: NavParams,private http: Http,public af: AngularFire,servAuth:servicioAuth)
  {
this.usuarioLogueado=servAuth.getUserInfo();    
 
this.cargarEncuesta();
  
  }
    agregarPregunta(datos){
      console.log(datos);
            this.datos.idEncuesta=datos;
      this.datos.queHago="AgregarPregunta";
       let modal = this.modalCtrl.create(Modales,this.datos);
      modal.present(); 
    }

    cargarEncuesta(){
      this.http.get("http://tppps2.hol.es/ws1/encuestas")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaEncuestas = quote;
    console.info(this.listaEncuestas);
  });
    }
    
   nuevaEncuesta(){
      this.datos.queHago="AgregarEncuesta";
       let modal = this.modalCtrl.create(Modales,this.datos);
      modal.present(); 
      this.cargarEncuesta();
   }

      BorrarEncuesta(datos){
        console.log(datos);
       this.http.post("http://tppps2.hol.es/ws1/encuestas/borrar", {
     idEncuesta:datos
         })
    .map(res => res.json())
    .subscribe((quote) =>{
      this.cargarEncuesta();
      console.info(quote);
     });

    }
    


}

