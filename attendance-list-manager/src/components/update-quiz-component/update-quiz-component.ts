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
import { SurveyType } from "../../app/app.module";
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
  haveRightAnswer: boolean;
  onlyOneAnswer: string;
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
    this.haveRightAnswer = false;
    this.haveEndDate = false;
    this.onlyOneAnswer = "Una";
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

  haveRightAnswerOnChange() {
    if (!this.haveRightAnswer) {
      this.options.forEach(itemInOptions => {
        itemInOptions.isRight = false;
      });
    }
    console.log(this.options);
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

      switch (this.survey.surveytypeid) {
        case SurveyType.Radiobuttons1Correct2Graphics:
          this.onlyOneAnswer = "Una";
          this.haveRightAnswer = true;
          break;
        case SurveyType.Radiobuttons1Graphic:
          this.onlyOneAnswer = "Una";
          this.haveRightAnswer = false;
          break;
        case SurveyType.Checkboxes1GraphicChooseNothing:
          this.onlyOneAnswer = "Mas";
          this.haveRightAnswer = false;
          break;
        case SurveyType.CheckboxesCorrects2GraphicsChooseNothing:
          this.onlyOneAnswer = "Mas";
          this.haveRightAnswer = true;
          break;
        default:
          console.log("Oops!");
          break;
      }


    }
  }


  showMessage(message: string, position: string = "middle"): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
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
            this.getJwtForDeleteOption(option.optionId, index);
          }
        }
      }]
    });
    confirm.present();
  }

  getJwtForDeleteOption(optionId, index) {
    this.hideSpinner = false;
    this.storage.get("jwt")
      .then(jwt => this.deleteOptionById(jwt, optionId, index))
      .catch(() => this.appService.logOut());
  }

  deleteOptionById(jwt, optionId, index) {
    this.appService.deleteOption(jwt, optionId)
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
  haveOptionsOnChange(e) {
    if (!this.haveOptions) {
      if (this.findOlderItems()) {
        console.log("Intento borrar");
        this.getJwtForDeleteAllOptions();
      }
      this.fillDefaultsNumberOfOptions()
    }
  }

  findOlderItems() {
    let rv: boolean = false;
    this.options.forEach(element => {
      if (element.optionId != 0) {
        rv = true;
      }
    });
    return rv;
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

  getJwtForDeleteAllOptions() {
    this.storage.get("jwt")
      .then(jwt => this.deleteAllOptions(jwt))
      .catch(() => this.appService.logOut());
  }

  deleteAllOptions(jwt) {
    this.hideSpinner = false;
    this.appService.deleteAllOptions(this.survey.questionid, jwt)
      .then(val => {
        this.showMessage("Respuestas Eliminadas");
        this.hideSpinner = true;
        this.nativeAudio.play('bien', () => console.log('ok'));

      })
      .catch(error => this.showMessage("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  }


  updateSurvey(jwt) {
    let isValid = true;
    let survey = new Survey();
    survey.surveyId = this.surveyid;
    survey.endDate = this.endDate;
    survey.title = this.form.get("title").value;
    survey.question.text = this.form.get("text").value;
    survey.question.questionId = this.survey.questionid;

    if (this.haveOptions) {

      if (this.onlyOneAnswer == "Una" && this.haveRightAnswer == true) {
        survey.surveyTypeId = SurveyType.Radiobuttons1Correct2Graphics; // Tipo 1

        let rightAnswers = 0;
        this.options.forEach(itemInOptions => {
          if (itemInOptions.isRight) {
            rightAnswers++;
          }
        });
        //Validando que tenga sólo una respuesta correcta.
        if (rightAnswers != 1) {
          this.showMessage("Debe seleccionar 1 repuesta como 'correcta'.", "bottom");
          isValid = false;
        }

      }
      else if (this.onlyOneAnswer == "Una" && this.haveRightAnswer == true) {
        survey.surveyTypeId = SurveyType.Radiobuttons1Correct2Graphics; //Tipo 2
      }
      else if (this.onlyOneAnswer == "Una" && this.haveRightAnswer == false) {
        survey.surveyTypeId = SurveyType.Radiobuttons1Graphic; //Tipo 3
      }
      else if (this.onlyOneAnswer == "Mas" && this.haveRightAnswer == false) {
        survey.surveyTypeId = SurveyType.Checkboxes1GraphicChooseNothing; //Tipo 4
      }
      else if (this.onlyOneAnswer == "Mas" && this.haveRightAnswer == true) {
        survey.surveyTypeId = SurveyType.CheckboxesCorrects2GraphicsChooseNothing; // Tipo 5
      }

      this.options.forEach(itemInOptions => {
        let option = new Option();
        option.isRight = itemInOptions.isRight;
        option.text = itemInOptions.text;
        option.optionId = itemInOptions.optionId;
        survey.question.options.push(option);
      });

    } else {
      survey.surveyTypeId = SurveyType.FreeAnswer;
    }
    if (isValid) {

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
}
