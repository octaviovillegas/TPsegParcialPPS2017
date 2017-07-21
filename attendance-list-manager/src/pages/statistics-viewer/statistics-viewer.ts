import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { AnswerTextViewer } from "../answer-text-viewer/answer-text-viewer";
import { SurveyType } from "../../app/app.module";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
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
  noData:boolean;
  //*******************

  // para las Radio2Graphics
  @ViewChild('barCanvas2') barCanvas2;
  radiobuttons1Correct2Graphics: boolean;
  options: Array<any>;
  //*******************
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage,  private settings:Settings, private alertCtrl: AlertController) {
    this.question = "";
    this.hideSpinner = false;
    this.noData = false;

    this.radiobuttons1Correct2Graphics = false;
    this.options = [];
  }

  ionViewDidLoad() {
    let surveyTypeId = this.navParams.get("surveyTypeId");
    this.getJWTForGetStatisticsForSurveyTypeFreeAnswer();
  }

  //****************** Para encuenstas de libre respuesta*******************/
  getStatisticsForSurveyTypeFreeAnswer(jwt) {
    let surveyid = this.navParams.get("surveyId");
    this.appService.getStatisticsForSurveyTypeFreeAnswer(jwt, surveyid)
      .then((response) => {
        let body = JSON.parse(response["_body"]);
        this.users = body.users;
        this.total = body.total;
        if(this.total == 0){
          this.noData = true;
        }
        this.question = this.navParams.get("question");
        this.drawStatistics();
        this.hideSpinner = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Elija un estilo',
      message: '',
      buttons: [
        {
          text: 'Cold-theme',
          handler: () => {this.encodeStyle('dark-theme'); 
          }
        },
        {
          text: 'Brown-theme',
          handler: () => { this.encodeStyle('brown-theme');
             
              
          }
        }
      ]
    });
    confirm.present();
  }
  encodeStyle(Style) {
    let rv;
    switch (Style) {
      case "dark-theme":
        this.settings.setActiveTheme('dark-theme');
        break;
      case "brown-theme":
        this.settings.setActiveTheme('brown-theme');
        break;
      
      default:
       this.settings.setActiveTheme('button-light')
        break;
    }
    
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
    var myChart1 = new Chart(this.barCanvas.nativeElement, {
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
  //****************************************************************************
}
