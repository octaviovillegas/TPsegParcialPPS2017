import { Component } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { NavController } from "ionic-angular";
import { StatisticsViewer } from "../../pages/statistics-viewer/statistics-viewer";

@Component({
  selector: 'question-list-for-statistics-viewer',
  templateUrl: 'question-list-for-statistics-viewer.html'
})
export class QuestionListForStatisticsViewer {

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

  pushPage(survey){
    console.log(survey.surveyid);
    this.navCtrl.parent.push(StatisticsViewer,{surveyId: survey.surveyid});
  }

}
