import { Component } from '@angular/core';
import { Survey } from "../../app/entities/survey";
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { Option } from "../../app/entities/option"
/**
 * Generated class for the DeleteQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'delete-quiz-component',
  templateUrl: 'delete-quiz-component.html'
})
export class DeleteQuizComponent {

  text: string;
  Encuestas: any;
  surveys: Array<any>;
  surveys2: Array<any>;
  JWT: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
    this.storage.get("jwt")
      .then((jwt) => {
        this.appService.getSurveysToEliminate(jwt).then((response: Response) => {

          if (response.status == 200) {
            this.surveys = JSON.parse(response["_body"]);

          } else {
            console.log("error"); //No tiene permisos.
          }
        })
          .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
        //Si por alguna razón el servidor no responde.
      });


  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
  eliminar(surveyid) {
    console.log(surveyid);


    this.appService.eliminatesurvey(surveyid).then((response: Response) => {
      this.storage.get("jwt")
        .then((jwt) => {
          this.appService.getSurveysToEliminate(jwt).then((response: Response) => {
            if (response.status == 200) {
              this.surveys = JSON.parse(response["_body"]);
            } else {
              console.log("error"); //No tiene permisos.
            }
          })
            .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
        });
    });
  }






}
