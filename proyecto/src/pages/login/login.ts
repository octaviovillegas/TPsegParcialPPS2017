import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Usuario} from "../usuario/usuario";
import {Http} from '@angular/http';
import {User} from '../servicioAuth/user';
import 'rxjs/Rx'; 

@Component({
  selector: 'page-contact',
  templateUrl: 'login.html'
})

export class Login {

usuarioLogueado : User;

   Login = {
 usuario: "",
  clave: ""
   } 
  constructor(public navCtrl: NavController,private auth: servicioAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  
}


  loading: Loading;
  
 
  public login() {
    this.showLoading()
    this.auth.login(this.Login).subscribe(allowed => {
      if (allowed) {        
        //this.navCtrl.setRoot('Inicio');
        this.usuarioLogueado = this.auth.getUserInfo();
        console.log("bienvenido",this.usuarioLogueado.usuario,this.usuarioLogueado.tipo);
      } else {
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





