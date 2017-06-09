import { Component } from '@angular/core';
import 'rxjs/Rx'; 
import { NavController,NavParams,ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Http} from '@angular/http';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { Toast } from '@ionic-native/toast';

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
private toast;
 constructor(public navCtrl: NavController,public NavParams: NavParams,private http: Http,public af: AngularFire
 ,servAuth:servicioAuth,private toastCtrl: ToastController)
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
     
        this.toast = this.toastCtrl.create({
        message: 'La encuesta se envio correctamente',
        duration: 3000,
        position: 'top'});

          this.toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
         
  }
  

EnviarEncuesta(){
  this.http.post("http://tppps2.hol.es/ws1/encuestas/enviar", {
     idEncuesta:this.encuestaSeleccionada,
     idCurso:this.cursoSeleccionado
     })
    .map(res => res.json())
    .subscribe((quote) =>{
    //  this.toast.present();
      this.encuestaSeleccionada = null;
      this.cursoSeleccionado =null;
      console.info(quote);
     });


}

}

