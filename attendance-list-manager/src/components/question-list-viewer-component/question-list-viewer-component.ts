import { Component, OnInit } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { NavController } from 'ionic-angular'
import { QuestionViewer } from "../../pages/question-viewer/question-viewer";
import { Storage } from "@ionic/storage";
@Component({
  selector: 'question-list-viewer-component',
  templateUrl: 'question-list-viewer-component.html'
})
export class QuestionListViewerComponent implements OnInit {
  hideSpinner: boolean
  text: string;
  surveys: Array<any>;

  constructor(private appService: AppService, private navCtrl:NavController, private storage: Storage) {
    this.hideSpinner = false;
 
}

  ngOnInit(): void {
    this.storage.get("jwt")
      .then((jwt) => {
    this.appService.getSurveysListById(jwt)
      .then((response) => {
        this.hideSpinner = true;
        let body = JSON.parse(response["_body"]);
        this.surveys = body;
      })
      .catch(() => {
        this.hideSpinner = true;
        console.log("Error")
      });
      });   
}

  pushPage(survey){
    this.navCtrl.parent.push(QuestionViewer,{surveyId: survey.surveyid});
  }
}
