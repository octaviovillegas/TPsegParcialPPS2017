import { Component } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { NavController } from "ionic-angular";
import { StatisticsViewer } from "../../pages/statistics-viewer/statistics-viewer";
import { SurveyType } from "../../app/app.module";
import { StatisticsOptionsViewer } from "../../pages/statistics-options-viewer/statistics-options-viewer";

@Component({
  selector: 'question-list-for-statistics-viewer',
  templateUrl: 'question-list-for-statistics-viewer.html'
})
export class QuestionListForStatisticsViewer {

  hideSpinner: boolean
  text: string;
  surveys: Array<any>;

  constructor(private appService: AppService, private navCtrl: NavController) {
    this.hideSpinner = false;
  }

  ngOnInit(): void {
    this.appService.getSurveys()
      .then((response) => {
        let body = JSON.parse(response["_body"]);
        this.surveys = body;
        this.hideSpinner = true;
      })
      .catch(() => {
        this.hideSpinner = true;
        console.log("Error")
      });
  }

  pushPage(survey) {
    let surveyTypeId = survey.surveytypeid;
    switch (surveyTypeId) {
      case "1":
        this.navCtrl.parent.push(StatisticsViewer, { surveyId: survey.surveyid, question: survey.text, surveyTypeId: survey.surveytypeid, questionId: survey.questionid });
        break;
      case "2":
        this.navCtrl.parent.push(StatisticsOptionsViewer, { surveyId: survey.surveyid, question: survey.text, surveyTypeId: survey.surveytypeid, questionId: survey.questionid });
        break;
      case "3":
        this.navCtrl.parent.push(StatisticsOptionsViewer, { surveyId: survey.surveyid, question: survey.text, surveyTypeId: survey.surveytypeid, questionId: survey.questionid });
        break;
      case "4":
        this.navCtrl.parent.push(StatisticsOptionsViewer, { surveyId: survey.surveyid, question: survey.text, surveyTypeId: survey.surveytypeid, questionId: survey.questionid });
        break;
      case "5":
        this.navCtrl.parent.push(StatisticsOptionsViewer, { surveyId: survey.surveyid, question: survey.text, surveyTypeId: survey.surveytypeid, questionId: survey.questionid });
        break;
      default:
        console.log("Oops!");
        break;
    }

  }

}
