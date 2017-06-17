import { Component } from '@angular/core';
import { Survey } from "../../app/entities/survey";
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Option } from "../../app/entities/option";
import { NavController} from 'ionic-angular';
import { UpdateQuizComponent } from '../update-quiz-component/update-quiz-component';
import { UpdateQuizContainerPage } from "../../pages/update-quiz-container-page/update-quiz-container-page";
@Component({
  selector: 'modify-quiz-component',
  templateUrl: 'modify-quiz-component.html'
})
export class ModifyQuizComponent {

  text: string;
  surveys: Array<any>;
  loadingPage:boolean;
  constructor(private storage: Storage, private appService: AppService, private navCtrl: NavController) {
    this.loadingPage = true;
    this.storage.get("jwt")
      .then((jwt) => {
        this.appService.getSurveysToEliminate(jwt).then((response: Response) => {

          if (response.status == 200) {
            this.surveys = JSON.parse(response["_body"]);
            this.loadingPage = false;
          } else {
            console.log("error"); 
            this.loadingPage = false;
          }
        })
          .catch((error) => {
            console.log("error");
            this.loadingPage = false;
          }); 
      });
  }


  pushPage(survey) {
    this.navCtrl.parent.push(UpdateQuizContainerPage, { surveyId: survey.surveyid });
  }

}
