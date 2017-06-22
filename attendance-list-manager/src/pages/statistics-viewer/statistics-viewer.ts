import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { AnswerTextViewer } from "../answer-text-viewer/answer-text-viewer";
import { SurveyType } from "../../app/app.module";

@Component({
  selector: 'page-statistics-viewer',
  templateUrl: 'statistics-viewer.html',
})
export class StatisticsViewer {

  hideSpinner: boolean
  @ViewChild('barCanvas') barCanvas;
  // para las FreeAnswers
  total: number;
  users: Array<any>;
  question: string;
  freeAnswer:boolean;
  //*******************
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
    this.question = "";
    this.freeAnswer = false;
  }

  ionViewDidLoad() {
    let surveyTypeId = this.navParams.get("surveyTypeId");
    switch (surveyTypeId) {
      case SurveyType.FreeAnswer:
        this.getJWTForGetStatisticsForSurveyTypeFreeAnswer();
        this.freeAnswer = true;
      case SurveyType.Radiobuttons1Correct2Graphics:
        break;
      case SurveyType.Radiobuttons1Graphic:
        break;
      case SurveyType.Checkboxes1GraphicChooseNothing:
        break;
      case SurveyType.CheckboxesCorrects2GraphicsChooseNothing:
        break;
      default:
        console.log("Oops!");
        break;
    }
  }



//****************** Para encuenstas de libre respuesta*******************/
  getStatisticsForSurveyTypeFreeAnswer(jwt) {
    let surveyid = this.navParams.get("surveyId");
    this.appService.getStatisticsForSurveyTypeFreeAnswer(jwt, surveyid)
      .then((response) => {
        let body = JSON.parse(response["_body"]);
        this.users = body.users;
        this.total = body.total;
        this.question = this.navParams.get("question");
        this.drawStatistics();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getJWTForGetStatisticsForSurveyTypeFreeAnswer() {
    this.storage.get("jwt")
      .then(jwt => this.getStatisticsForSurveyTypeFreeAnswer(jwt))
      .catch(() => {
        console.log("No hay jwt");
      });
  }

  drawStatistics() {
    let votes = "total: " + this.total;
    var myChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["alumnos"],
        datasets: [{
          label: votes,
          data: [this.total],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
          ],
          borderWidth: 1
        }]
      },
    });

  }
  itemSelected(student) {
    this.navCtrl.push(AnswerTextViewer, { student: student, question: this.question })
  }
  //*************************************************************************** */
}
