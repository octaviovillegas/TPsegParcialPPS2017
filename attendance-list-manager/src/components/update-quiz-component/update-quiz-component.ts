import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Survey } from "../../app/entities/survey";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { Option } from "../../app/entities/option";
@Component({
  selector: 'update-quiz-component',
  templateUrl: 'update-quiz-component.html'
})
export class UpdateQuizComponent implements OnInit {

  survey: any;
  surveyid: number;
  form: FormGroup;

  haveOptions: boolean;
  haveEndDate: boolean;
  endDate: string;
  options: Array<Option>;
  hideSpinner: boolean;
  disableDeleteButton: boolean;

  ngOnInit() {

  }

  constructor(public navPrms: NavParams, private nativeAudio: NativeAudio, private vibration: Vibration, public storage: Storage, public appService: AppService, private fb: FormBuilder, public navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.hideSpinner = false;
    this.form = this.fb.group({
      title: ["", [Validators.required]],
      text: ["", [Validators.required]],
    });
    this.haveOptions = false;
    this.haveEndDate = false;
    this.disableDeleteButton = true;
    this.surveyid = this.navPrms.get("surveyId");
    this.options = [];
    this.appService.getSurveyById(this.surveyid)
      .then((response: Response) => {
        if (response.status == 200) {

          let body = JSON.parse(response["_body"]);
          console.log(body);
          this.survey = body.survey;
          this.convertItemsInOptionsArray(body.options);
          this.objectToForm();
          this.hideSpinner = true;
        } else {
          this.hideSpinner = true;
        }
      })
      .catch((error) => {
        this.hideSpinner = true;
      });
  }

  convertItemsInOptionsArray(options) {
    options.forEach(element => {
      let option = new Option();
      option.text = element.text;
      option.isRight = element.isright;
      option.optionId = element.optionid;
      option.questionId = element.questionid;
      this.options.push(option);
    });
    console.log(this.options);
  }

  objectToForm() {
    this.form.get("title").setValue(this.survey.title);
    this.form.get("text").setValue(this.survey.text);
    if (this.survey.enddate != "0000-00-00") {
      this.haveEndDate = true;
    }
    this.endDate = this.survey.enddate;
    if (this.options.length == 0) {
      this.fillDefaultsNumberOfOptions();
    } else {
      this.haveOptions = true;
      if (this.options.length > 2)
        this.disableDeleteButton = false;
    }
  }


  showMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  //---------------> Add/Delete options
  deleteOption(index, option) {

    let confirm = this.alertCtrl.create({
      title: '¿Desea eliminar ésta opción?',
      message: '',
      buttons: [{
        text: 'Cancelar',
        handler: () => { }
      },
      {
        text: 'Aceptar',
        handler: () => {
          if (option.optionId == 0) {
            if (this.options.length <= 3) {
              this.disableDeleteButton = true;
            }
            this.options.splice(index, 1);
            this.vibration.vibrate(500);
          } else {
            this.getJwtForDeleteOption(option.optionId,index);
          }
        }
      }]
    });
    confirm.present();
  }

  getJwtForDeleteOption(optionId,index) {
    this.hideSpinner = false;
    this.storage.get("jwt")
      .then(jwt => this.deleteOptionById(jwt,optionId,index))
      .catch(() => this.appService.logOut());
  }

  deleteOptionById(jwt,optionId,index) {
    this.appService.deleteOption(jwt,optionId)
     .then((response: Response) => {
        if (response.status == 200) {
          if (this.options.length <= 3) {
              this.disableDeleteButton = true;
            }
            this.options.splice(index, 1);
            this.vibration.vibrate(500);
            this.hideSpinner = true;
        } else {
          console.log("No se pudo eliminar la opcion");
          this.hideSpinner = true;
        }
      })
      .catch((error) => {
        this.hideSpinner = true;
      });
  }

  add() {
    if (this.options.length >= 2) {
      this.disableDeleteButton = false;
    }
    let option = new Option();
    this.options.push(option);
  }
  //---------------//
  haveOptionsOnChange() {
    if (!this.haveOptions) {
      this.fillDefaultsNumberOfOptions()
    }
  }

  haveEndDateOnChange() {
    if (!this.haveEndDate) {
      this.endDate = "";
    }
  }
  fillDefaultsNumberOfOptions() {
    this.options = [];
    let option1 = new Option();
    option1.isRight = false;
    let option2 = new Option();

    this.options.push(option1);
    this.options.push(option2);
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea guardar la Encuesta?',
      message: '',
      buttons: [{
        text: 'Cancelar',
        handler: () => { }
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.getJwtForUpdateSurvey();
          this.vibration.vibrate(500);
        }
      }]
    });
    confirm.present();
  }

  getJwtForUpdateSurvey() {
    this.storage.get("jwt")
      .then(jwt => this.updateSurvey(jwt))
      .catch(() => this.appService.logOut());
  }


  updateSurvey(jwt) {
    let survey = new Survey();
    survey.surveyId = this.surveyid;
    survey.endDate = this.endDate;
    survey.title = this.form.get("title").value;
    survey.question.text = this.form.get("text").value;
    survey.question.questionId = this.survey.questionid;

    if (this.haveOptions) {
      this.options.forEach(itemInOptions => {
        let option = new Option();
        option.isRight = itemInOptions.isRight;
        option.text = itemInOptions.text;
        option.optionId = itemInOptions.optionId;
        survey.question.options.push(option);
      });
      console.log(survey);
    }

    this.hideSpinner = false;
    this.appService.modifySurvey(survey, jwt)
      .then(val => {
        this.showMessage("Encuesta Actualizada");
        this.hideSpinner = true;
        this.nativeAudio.play('bien', () => console.log('ok'));

      })
      .catch(error => this.showMessage("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  }
}
