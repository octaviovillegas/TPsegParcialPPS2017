import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { Answer } from "../../app/entities/answerData";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-question-viewer',
  templateUrl: 'question-viewer.html',
})
export class QuestionViewer implements OnInit {

  loadingPage: boolean;
  hideSpinner: boolean;
  withoutOptions: boolean;
  includesOptions: boolean;
  uniqueRightAnswer: boolean;
  survey: any;
  options: Array<any>;

  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private fb: FormBuilder, private storage: Storage, private toastCtrl: ToastController) {
    this.hideSpinner = true;
    this.options = [];
    this.survey = {};
    this.loadingPage = true;

    //options container
    this.includesOptions = false;
    this.uniqueRightAnswer = false;
    this.withoutOptions = false;

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
        console.log(this.survey);
        console.log(this.options);
        this.loadingPage = false;
      })
      .catch(() => console.log("Error"))
  }


  ionViewDidLoad() {

  }

  setOptionsContainer() {
    let rightOptions = 0;
    this.options.forEach(element => {
      if (element.isright) {
        rightOptions++;
      }
    });

    if (rightOptions == 0 && (this.options.length == 0)) {
      this.withoutOptions = true;
    } else {
      if (rightOptions == 1) {
        this.uniqueRightAnswer = true;
      }
    }
  }

  setSurveyAndOptions(survey, options) {
    this.survey = survey;
    this.options = options;
  }

  formToObject() {
    this.hideSpinner = false;
    let answer = new Answer();
    answer.text = this.form.get("answer").value;
    answer.surveyId = this.survey.surveyid;
    answer.questionId = this.survey.questionid;
    this.saveAnswer(answer);
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

  form2ToObject() {
    this.hideSpinner = false;
    let answer = new Answer();
    let optionId = this.form2.get("optionid").value;
    answer.optionIds.push(optionId);
    answer.questionId = this.survey.questionid;
    answer.surveyId = this.survey.surveyid;
    this.saveAnswer(answer);
  }

  sendData() {
    this.hideSpinner = false;
    let answer = new Answer();
    let optionId = this.form2.get("optionid").value;
    answer.surveyId = this.survey.surveyid;
    this.options.forEach(option => {
      answer.optionIds.push(option.optionid);
    });
    answer.questionId = this.survey.questionid;
    this.saveAnswer(answer);
  }

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
