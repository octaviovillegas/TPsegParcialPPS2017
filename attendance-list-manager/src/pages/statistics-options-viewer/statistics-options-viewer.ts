import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { AnswerTextViewer } from "../answer-text-viewer/answer-text-viewer";
import { SurveyType } from "../../app/app.module";
import { AnswerOptionTextViewer } from "../answer-option-text-viewer/answer-option-text-viewer";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'page-statistics-options-viewer',
  templateUrl: 'statistics-options-viewer.html',
})
export class StatisticsOptionsViewer {
  hideSpinner: boolean
  @ViewChild('barCanvas') barCanvas;
  total: number;
  users: Array<any>;
  question: string;
  options: Array<any>;
  perOption: Array<any>;
  optionsWithTotal: Array<any>;
  noData:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService,  private storage: Storage,private settings:Settings, private alertCtrl: AlertController) {
    this.hideSpinner = false;
    this.question = "";
    this.options = [];
    this.noData = false;
  }

  ionViewDidLoad() {
    let surveyTypeId = this.navParams.get("surveyTypeId");
    this.getJWTForGetStatisticsForSurveyTypeRadiobuttons1Correct2Graphics();
  }

  getJWTForGetStatisticsForSurveyTypeRadiobuttons1Correct2Graphics() {
    this.storage.get("jwt")
      .then(jwt => this.getStatisticsForSurveyTypeRadiobuttons1Correct2Graphics(jwt))
      .catch(() => {
        console.log("No hay jwt");
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
  getStatisticsForSurveyTypeRadiobuttons1Correct2Graphics(jwt) {
    let surveyid = this.navParams.get("surveyId");
    let questionid = this.navParams.get("questionId");
    this.appService.getStatisticsForSurveyTypeRadiobuttons1Correct2Graphics(jwt, surveyid, questionid)
      .then((response) => {
        let body = JSON.parse(response["_body"]);
        this.users = body.users;
        this.total = body.total;
        if(this.total == 0){
          this.noData = true;
        }
        this.options = body.options;
        this.question = this.navParams.get("question");
        this.perOption = body.perOption;
        this.setQuantityPerOption(body.perOption);
        this.drawStatisticsRadiobuttons1Correct2Graphics();
        this.hideSpinner = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  drawStatisticsRadiobuttons1Correct2Graphics() {
    let labelsData = [];
    let quantityData = [];
    this.optionsWithTotal.forEach(option => {
      labelsData.push(option.text);
      quantityData.push(option.total);
    });
    let votes = "total: " + this.total;
    var myChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labelsData,
        datasets: [{
          label: votes,
          data: quantityData,
          borderWidth: 1
        }]
      },
    });
  }

  setQuantityPerOption(votes) {
    let optionsWithTotal = [];

    this.options.forEach(option => {
      let optionWithTotal = { optionid: option.optionid, total: 0, text: option.text };
      optionsWithTotal.push(optionWithTotal);
    });

    optionsWithTotal.forEach(withouttotal => {
      this.perOption.forEach(option => {
        if (withouttotal.optionid == option.optionid) {
          withouttotal.total = option.total;
        }
      });
    });

    this.optionsWithTotal = optionsWithTotal;
  }

  itemSelected(student) {
    let questionId = this.navParams.get("questionId");
    this.navCtrl.push(AnswerOptionTextViewer, { student: student, question: this.question, questionId: questionId })
  }

}
