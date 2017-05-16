import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Usuario} from "../pages/usuario/usuario";
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
  constructor(public navCtrl: NavController,public http: Http) {
    this.http.get("http://localhost/ws1/usuarios")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.listaBD = quote;
    console.info(this.listaBD);
  });
  }

}

