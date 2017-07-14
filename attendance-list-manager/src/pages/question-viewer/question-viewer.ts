import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { Answer } from "../../app/entities/answerData";
import { HomePage } from "../home/home";
import { SurveyType } from "../../app/app.module";
import { Option } from "../../app/entities/option";
import { QuestionListViewerComponent } from "../../components/question-list-viewer-component/question-list-viewer-component";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";

@Component({
  selector: 'page-question-viewer',
  templateUrl: 'question-viewer.html',
})
export class QuestionViewer implements OnInit {

  loadingPage: boolean;
  hideSpinner: boolean;
  freeAnswer: boolean;
  withRadios: boolean;
  withCheckboxes: boolean;
  survey: any;
  options: Array<Option>;

  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private fb: FormBuilder, private storage: Storage, private toastCtrl: ToastController,private settings:Settings, private alertCtrl: AlertController) {
    this.hideSpinner = true;
    this.options = [];
    this.survey = {};
    this.loadingPage = true;

    //options container
    this.freeAnswer = false;
    this.withRadios = false;
    this.withCheckboxes = false;

    //Forms
    this.form = this.fb.group({
      answer: ["", Validators.required],
    });

    this.form2 = this.fb.group({
      optionid: ["", Validators.required],
    });

    this.form3 = this.fb.group({
      optionids: [],
    });

  }

  ngOnInit(): void {
    let surveyId = this.navParams.get("surveyId");
    this.appService.getSurveyById(surveyId)
      .then((response) => {
        let body = JSON.parse(response["_body"]);
        this.setSurveyAndOptions(body.survey, body.options)
        this.setOptionsContainer();
        this.loadingPage = false;
      })
      .catch(() => console.log("Error"))
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
  ionViewDidLoad() {

  }

  setOptionsContainer() {

    switch (this.survey.surveytypeid) {
      case "1":
        this.freeAnswer = true;
        this.withRadios = false;
        this.withCheckboxes = false;
        break;
      case "2":
        this.freeAnswer = false;
        this.withRadios = true;
        this.withCheckboxes = false;
        break;
      case "3":
        this.freeAnswer = false;
        this.withRadios = true;
        this.withCheckboxes = false;
        break;
      case "4":
        this.freeAnswer = false;
        this.withRadios = false;
        this.withCheckboxes = true;
        break;
      case "5":
        this.freeAnswer = false;
        this.withRadios = false;
        this.withCheckboxes = true;
        break;
      default:
        console.log("Oops!")
        break;
    }
  }

  setSurveyAndOptions(survey, options) {
    this.survey = survey;
    this.convertItemsInOptionsArray(options);
  }

  convertItemsInOptionsArray(options) {
    options.forEach(element => {
      let option = new Option();
      option.text = element.text;
      option.isRight = false;
      option.optionId = element.optionid;
      option.questionId = element.questionid;
      this.options.push(option);
    });
  }

  saveAnswer(answer) {
    this.storage.get("jwt")
      .then((jwt) => {

        this.appService.saveAnswer(answer, jwt)
          .then((response) => {

            this.hideSpinner = true;
            this.goBack();
          })
          .catch(() => {
            console.log("Error al intentar guardar la respuesta");
            this.hideSpinner = true;
          });
      })
      .catch(() => {
        console.log("error no existe jwt");
        this.hideSpinner = true;
      });
  }

  //In case that don't have options
  saveTextAnswer() {
    this.hideSpinner = false;
    let answer = new Answer();
    answer.text = this.form.get("answer").value;
    answer.surveyId = this.survey.surveyid;
    answer.questionId = this.survey.questionid;
    this.saveAnswer(answer);
  }
  //******************************


  //In case that have options
  saveRadioAnswer() {
    this.hideSpinner = false;
    let answer = new Answer();
    let optionId = this.form2.get("optionid").value;
    answer.optionIds.push(optionId);
    answer.questionId = this.survey.questionid;
    answer.surveyId = this.survey.surveyid;
    answer.chooseNothing = false;
    console.log(answer);
    this.saveAnswer(answer);
  }

  saveCheckboxesAnswer() {
    this.hideSpinner = false;
    let answer = new Answer();
    answer.surveyId = this.survey.surveyid;
    this.options.forEach(option => {
      if (option.isRight == true) {
        answer.optionIds.push(option.optionId);
      }
    });
    if (answer.optionIds.length == 0) {
      answer.chooseNothing = true;
    }
    answer.questionId = this.survey.questionid;
    this.saveAnswer(answer);
  }
  //*********************************************



  goBack() {
    this.showMessage("La respuesta fué enviada con éxito");
    this.navCtrl.pop();
  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  showMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
