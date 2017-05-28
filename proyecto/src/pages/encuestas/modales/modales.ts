import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalController, ViewController } from 'ionic-angular';
import {Encuestas} from "../encuestas";
import {Http} from '@angular/http';

@Component({
  selector: 'page-Modales',
  templateUrl: 'modales.html'
})

export class Modales {
        private datos = {
          queHago:"",
          idEncuesta:Number
        };
        private encuesta={
          descripcion:"",
          fechaInicio:"",
          fechaFin:""
           }
        private veoPreguntas=false;
        private encuestas :FirebaseListObservable<any[]>;
        private idEncuesta;
        private tipoPregunta;
        private veoEncuesta=false;
        private opcion1;
        private opcion2;
        private opcion3;
        private opcion4;
        private pregunta;
 constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController
 ,public NavParams: NavParams,public af: AngularFire,private http: Http) 
{
   this.datos = NavParams.data;
   this.idEncuesta=this.datos.idEncuesta;
   console.info(this.datos);
        if(this.datos.queHago == "AgregarPregunta"){
          this.veoPreguntas=true; 
             }else if(this.datos.queHago =="AgregarEncuesta"){
  this.veoEncuesta =true;

             }
    }
     


dismiss() {
  this.veoEncuesta =false;
  this.veoPreguntas=false;
   this.viewCtrl.dismiss();
 }

altaEncuesta(){
  console.info(this.encuesta);
    this.http.post("http://tppps2.hol.es/ws1/encuestas/alta", {
     descripcion:this.encuesta.descripcion,
     fechaInicio:this.encuesta.fechaInicio,
     fechaFin:this.encuesta.fechaFin
     })
    .map(res => res.json())
    .subscribe((quote) =>{
      console.info(quote);
     });
       
      this.viewCtrl.dismiss();
}
altaPregunta(){
  console.log(this.idEncuesta);
  if(this.tipoPregunta =="1"){
    this.tipoPregunta ="text";
  }else if(this.tipoPregunta =="2"){
    this.tipoPregunta ="radio";
  }else if(this.tipoPregunta =="3"){
    this.tipoPregunta ="checkbox";
  }
    this.http.post("http://tppps2.hol.es/ws1/pregunta/alta", {
    idEncuesta:this.idEncuesta,
    tipo:this.tipoPregunta,
    pregunta:this.pregunta,
    opcion1:this.opcion1,
    opcion2:this.opcion2,
    opcion3:this.opcion3,
    opcion4:this.opcion4
     })
    .map(res => res.json())
    .subscribe((quote) =>{
      console.info(quote);
     });
       
      this.viewCtrl.dismiss();
}


}