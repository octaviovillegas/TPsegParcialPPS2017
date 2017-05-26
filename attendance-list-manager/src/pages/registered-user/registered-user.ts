import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from 'ionic-angular';
import { Response } from "@angular/http";
import { AppService } from "../../providers/app-service";
import { HomePage } from "../../pages/home/home";
import {gestionalumno } from "../../pages/gestionalumno/gestionalumno";
import {gestionprofesor } from "../../pages/gestionprofesor/gestionprofesor";
import { generarencuesta } from "../../pages/generarencuesta/generarencuesta";

@Component({
  selector: 'page-registered-user',
  templateUrl: 'registered-user.html',
})
export class RegisteredUserPage {
  title: string;
  actions:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService) {
    this.title = "Menu";
    this.actions = [];
    this.fillPermissionList();
  }

  ionViewDidLoad() {
  }

  fillPermissionList() {
    this.storage.get("jwt").then((value) => {
      this.appService.getPermissionsByUserRol(value).then(
        (response: Response) => {
          let body = JSON.parse(response["_body"]);
          if (body.isValidToken) {
            this.actions = body.permissions;
          } else {
            console.log("El jwt corrupto");
          }
        }).catch(error=>console.log(error));
    }).catch((error) => {
      console.log("Log out here!...");
    });
  }

  logOutOnClick(){
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
accedera(a){

if(a="Gestionar Alumno"){this.navCtrl.setRoot(gestionalumno);}
if(a="Gestionar Profesor"){this.navCtrl.setRoot(gestionprofesor);}
if(a="Gestionar Encuesta"){this.navCtrl.setRoot(generarencuesta);}



}
}
