import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from 'ionic-angular';
import { Response } from "@angular/http";
import { AppService } from "../../providers/app-service";
import { HomePage } from "../../pages/home/home";

import { Survey } from "../../app/entities/survey";
import {assistAndAbsences} from "../../pages/assistAndAbsences/assistAndAbsences";
import {gestionarasistencia } from "../../pages/gestionarasistencia/gestionarasistencia";
import {gestionalumno } from "../../pages/gestionalumno/gestionalumno";
import {gestionprofesor } from "../../pages/gestionprofesor/gestionprofesor";
import { generarencuesta } from "../../pages/generarencuesta/generarencuesta";
import {  NgSwitch,  NgSwitchDefault} from "@angular/common";

@Component({
  selector: 'page-registered-user',
  templateUrl: 'registered-user.html',
})
export class RegisteredUserPage {
  title: string;
  actions: any[];
  Tipousuario: any;
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
        }).catch(error => console.log(error));
    }).catch((error) => {
      console.log("Log out here!...");
    });
  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
accedera(a){

  //*******************************************************************************/
  //*******************************************************************************/
  //Mover éste código al componente para dar de alta una nueva encuesta (New Quiz).
  // getJwtForNewSurvey(){
  //   this.storage.get("jwt")
  //         .then(jwt=>this.newSurvey(jwt))
  //         .catch(()=>this.appService.logOut());
  // }
  // newSurvey(jwt){
  //   let survey = new Survey();
  //   survey.endDate = "2030/8/4";
  //   survey.title = "Titulo de la encuesta";
  //   survey.question.text = "¿Una pregunta?";
  //   console.log(survey);
  //   this.appService.newSurvey(survey,jwt)
  //         .then(val=>console.log("Dejar de mostrar el spinner, habilitar los botones, etc..."))
  //         .catch(error=>console.log("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  // }
  // //*******************************************************************************/
  // //*******************************************************************************/

// switch (a) {
//   case (a="Gestionar Alumno"):
//     this.navCtrl.setRoot(gestionalumno);
//     break;
//  case (a="Gestionar Profesor"):
//     this.navCtrl.setRoot(gestionprofesor);
//     break;
//     case (a="Gestionar Encuesta"):
//     this.navCtrl.setRoot(generarencuesta);
//     break;
//   default:
//     break;
// }    
// if(a="Gestionar Alumno"){this.navCtrl.setRoot(gestionalumno);}
// if(a="Gestionar Profesor"){this.navCtrl.setRoot(gestionprofesor);}
// if(a="Gestionar Encuesta"){this.navCtrl.setRoot(generarencuesta);}


}
asistencias(){

this.navCtrl.setRoot(assistAndAbsences);




}
gAsistencia(){this.navCtrl.setRoot(gestionarasistencia);}

insertar()
{this.storage.get("rol").then(val=>{this.Tipousuario=val});

if(this.Tipousuario=='Administrator'){
  console.log ("todo ok");
}}
}
