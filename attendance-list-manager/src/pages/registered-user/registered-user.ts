import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from 'ionic-angular';
import { Response } from "@angular/http";
import { AppService } from "../../providers/app-service";
import { MenuController } from 'ionic-angular';

//Pages
import { HomePage } from "../../pages/home/home";

//Classes, Wrappers
import { Survey } from "../../app/entities/survey";
import { Option } from "../../app/entities/option"

//Components
import { QuizManagerComponent } from "../../components/quiz-manager-component/quiz-manager-component";
import { QuestionListViewerComponent } from "../../components/question-list-viewer-component/question-list-viewer-component";
import { SubjectListComponent } from "../../components/subject-list-component/subject-list-component";
import { AttendanceListManagerComponent } from "../../components/attendance-list-manager-component/attendance-list-manager-component";

@Component({
  selector: 'page-registered-user',
  templateUrl: 'registered-user.html',
})
export class RegisteredUserPage {
  title: string;
  actions: any[];
  rootComponent: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService, private menuCtrl: MenuController) {
    this.title = "Menu";
    this.actions = [];
  }

  ionViewDidLoad() {
    this.fillPermissionList();
  }

  fillPermissionList() {
    this.storage.get("jwt")
      .then((jwt) => {
        this.getPermissionsByUserRol(jwt)
      }) //Si encuentra las credenciales
      .catch((error) => this.logOutOnClick()); //Si no cuenta con credenciales

  }

  getPermissionsByUserRol(jwt) {
    this.appService.getPermissionsByUserRol(jwt)
      .then((response: Response) => {

        if (response.status == 200) {
          let body = JSON.parse(response["_body"]);

          this.setRootComponent(body["code"]);

          this.actions = body['permissions'];
        } else {
          this.logOutOnClick(); //No tiene permisos.
        }
      })
      .catch(() => this.logOutOnClick()); //Si por alguna razón el servidor no responde.
  }

  setRootComponent(rol) {
    switch (rol) {
      case "Administrator":
        this.rootComponent = QuizManagerComponent;
        break;
      case "Teacher":
        this.rootComponent = QuizManagerComponent;
        break;
      case "Student":
        this.rootComponent = QuestionListViewerComponent;
        break;
      default:
        this.rootComponent = QuizManagerComponent;
        break;
    }
  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  getJwtForNewSurvey() {
    this.storage.get("jwt")
      .then(jwt => this.newSurvey(jwt))
      .catch(() => {
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

  selectedActionOnChange(selectedAction) {
    switch (selectedAction) {
      case "Ver encuestas":
        this.rootComponent = QuestionListViewerComponent;
        break;
      case "Gestionar encuestas":
        this.rootComponent = QuizManagerComponent;
        break;
      case "Ver faltas y asistencias":
        this.rootComponent = SubjectListComponent;
        break;
      case "Tomar asistencia":
        this.rootComponent = AttendanceListManagerComponent;
        break;
      default:
        this.rootComponent = QuestionListViewerComponent;
        break;
    }
    this.menuCtrl.close();
  }
}
