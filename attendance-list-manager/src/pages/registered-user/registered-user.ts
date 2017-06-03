import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from 'ionic-angular';
import { Response } from "@angular/http";
import { AppService } from "../../providers/app-service";
import { HomePage } from "../../pages/home/home";
import { Survey } from "../../app/entities/survey";
import { Option } from "../../app/entities/option";

@Component({
  selector: 'page-registered-user',
  templateUrl: 'registered-user.html',
})
export class RegisteredUserPage {
  title: string;
  actions: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService) {
    this.title = "Menu";
    this.actions = [];
    this.fillPermissionList();
  }

  ionViewDidLoad() {
  }

  fillPermissionList() {
    this.storage.get("jwt")
      .then((jwt) => this.getPermissionsByUserRol(jwt)) //Si encuentra las credenciales
      .catch(() => this.logOutOnClick()); //Si no cuenta con credenciales

  }

  getPermissionsByUserRol(jwt) {
    this.appService.getPermissionsByUserRol(jwt)
      .then((response: Response) => {
        
        if (response.status == 200) {
          let body = JSON.parse(response["_body"]);

          this.actions = body['permissions'];
        }else{
          console.log("usted no tiene permisos para realizar ésta acción"); //No tiene permisos.
        }
      })
      .catch(() => this.logOutOnClick()); //Si por alguna razón el servidor no responde.
  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  //*******************************************************************************/
  //*******************************************************************************/
  //Mover éste código al componente para dar de alta una nueva encuesta (New Quiz).
  getJwtForNewSurvey() {
    this.storage.get("jwt")
      .then(jwt => this.newSurvey(jwt))
      .catch(() => {
        console.log("No hay credenciales");
        this.logOutOnClick()
      });
  }
  newSurvey(jwt) {
    //Encuesta
    let survey = new Survey();
    survey.endDate = "2030/8/4";
    survey.title = "Titulo de la encuesta";
    //Pregunta
    survey.question.text = "¿Una pregunta?";
    //Opciones

    let option = new Option();
    option.isRight = true;
    option.text = "Soy el texto de una opción correcta";

    let option2 = new Option();
    option2.isRight = false;
    option2.text = "Soy el texto de una opción incorrecta";

    let option3 = new Option();
    option3.isRight = true;
    option3.text = "Soy el texto de una opción correcta";

    survey.question.options.push(option);
    survey.question.options.push(option2);
    survey.question.options.push(option3);
    console.log(survey);
    this.appService.newSurvey(survey, jwt)
      .then(val => console.log("Dejar de mostrar el spinner, habilitar los botones, etc..."))
      .catch(error => console.log("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  }
  //*******************************************************************************/
  //*******************************************************************************/
}
