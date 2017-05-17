import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Usuario} from "../usuario/usuario";
import {Http} from '@angular/http';
import 'rxjs/Rx'; 

@Component({
  selector: 'page-contact',
  templateUrl: 'login.html'
})

export class Login {

listaBD = {};

   Login = {
 usuario: "",
  clave: ""
   } 
  constructor(public navCtrl: NavController,public http: Http,private auth: servicioAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.http.get("http://localhost/ws1/usuarios")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaBD = quote;
    console.info(this.listaBD);
  });
}


  loading: Loading;
  
 
  public login() {
    this.showLoading()
    this.auth.login(this.Login).subscribe(allowed => {
      if (allowed) {        
        //this.navCtrl.setRoot('Inicio');
        console.log("bienvenido");
      } else {
        console.log("hola");
        this.showError("Acceso denegado");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present().then(() => this.loading.dismiss());
  }
 
  showError(text) {
this.loading.dismiss().catch(() => console.log('ERROR: Control de loading fallo'));
    let alert = this.alertCtrl.create({
      title: 'Fallo',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

EscribirCredenciales(tipo){
  if(tipo == "Administrador" ){
    this.Login.usuario = "Administrador";
    this.Login.clave ="Administrador";
  }else if(tipo == "Administrativo" ){
    this.Login.usuario = "Administrativo";
    this.Login.clave ="Administrativo";
  }else if(tipo == "Alumno" ){
    this.Login.usuario = "Alumno";
    this.Login.clave ="Alumno";
  }else if(tipo == "Profesor" ){
     this.Login.usuario = "Profesor";
    this.Login.clave ="Profesor";
    
  }
}

}





