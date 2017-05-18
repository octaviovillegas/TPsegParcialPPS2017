import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Usuario} from "../usuario/usuario";
import {Http} from '@angular/http';
import {User} from '../servicioAuth/user';
import {Administrador} from "../administrador/administrador";
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


  
 
 public loading: Loading;

public login() {
    this.showLoading().then(() => { // Show the loading before making the request

        this.auth.login(this.Login).subscribe(allowed => { // Make the http request

            this.loading.dismiss().then(() => { // Hide the loading

                if (allowed) {

                    // this.navCtrl.setRoot('Inicio');
                    this.usuarioLogueado = this.auth.getUserInfo();

                    if (this.usuarioLogueado.tipo == "Administrador") {
                        this.navCtrl.setRoot(Administrador);
                    }

                    console.log("bienvenido", this.usuarioLogueado.usuario, this.usuarioLogueado.tipo);

                } else {
                    this.showError("Acceso denegado");
                }
            });
        }, error => {
            this.loading.dismiss().then(() => { // Hide the loading
                this.showError(error);
            });
        });
    });

}

showLoading(): Promise<any> { // <- Return the promise
    this.loading = this.loadingCtrl.create({
        content: 'Por favor espere...',
        dismissOnPageChange: true
    });
    return this.loading.present(); // <- Added the return keyword here
}

showError(text) {
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





