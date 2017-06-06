import { Component, OnInit } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { NavController } from 'ionic-angular'
import { questionViewer } from "../../pages/questionViewer/questionViewer";

@Component({
  selector: 'question-list-viewer-component',
  templateUrl: 'question-list-viewer-component.html'
})
export class QuestionListViewerComponent implements OnInit {
  hideSpinner: boolean
  text: string;
  surveys: Array<any>;

  constructor(private appService: AppService, private navCtrl:NavController) {
    this.hideSpinner = false;
  }

  ngOnInit(): void {
    this.appService.getSurveys()
      .then((response) => {
        this.hideSpinner = true;
        let body = JSON.parse(response["_body"]);
        this.surveys = body;
      })
      .catch(() => {
        this.hideSpinner = true;
        console.log("Error")
      });
  }

  pushPage() {
    this.navCtrl.push(questionViewer);
  }

}
