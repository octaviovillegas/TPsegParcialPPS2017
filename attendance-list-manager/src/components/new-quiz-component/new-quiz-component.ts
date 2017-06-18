import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { Survey } from "../../app/entities/survey";
import { Option } from "../../app/entities/option";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuizManagerComponent } from '../quiz-manager-component/quiz-manager-component';
import { AlertController } from "ionic-angular";
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'new-quiz-component',
  templateUrl: 'new-quiz-component.html'
})
export class NewQuizComponent {
  haveOptions: boolean;
  haveEndDate: boolean;
  endDate: string;
  form: FormGroup;
  options: Array<Option>;
  hideSpinner: boolean;
  disableDeleteButton: boolean;

  constructor(public navCtrl: NavController, private nativeAudio: NativeAudio, private storage: Storage, private toastCtrl: ToastController, private fb: FormBuilder, private vibration: Vibration, private appService: AppService, private alertCtrl: AlertController) {
    //Set audio configurations
    this.nativeAudio.preloadSimple('bien', 'assets/sound/ok.mp3');
    this.nativeAudio.preloadSimple('error', 'assets/sound/2.mp3');
    this.form = this.fb.group({
      Titulo: ["", [Validators.required]],
      Pregunta: ["", [Validators.required]],
    });

    //Set initial configurations
    this.endDate = "";
    this.haveOptions = false;
    this.haveEndDate = false;
    this.options = [];
    this.hideSpinner = true;
    this.disableDeleteButton = true;
    this.fillDefaultsNumberOfOptions();
  }

  fillDefaultsNumberOfOptions() {
    this.options = [];
    let option1 = new Option();
    option1.isRight = false;
    let option2 = new Option();

    this.options.push(option1);
    this.options.push(option2);
  }
  

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

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea guardar la Encuesta?',
      message: '',
      buttons: [{
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.getJwtForNewSurvey();
            this.vibration.vibrate(500);
          }
        }]
      });
    confirm.present();
  }

  getJwtForNewSurvey() {

    this.storage.get("jwt")
      .then(jwt => this.newSurvey(jwt))
      .catch(() => this.appService.logOut());
  }


  newSurvey(jwt) {
    let survey = new Survey();
    survey.endDate = this.endDate;
    survey.title = this.form.get("Titulo").value;
    survey.question.text = this.form.get("Pregunta").value;

    if (this.haveOptions) {
      this.options.forEach(itemInOptions => {
        let option = new Option();
        option.isRight = itemInOptions.isRight;
        option.text = itemInOptions.text;
        survey.question.options.push(option);
      });
    }

    this.hideSpinner = false;
    this.appService.newSurvey(survey, jwt)
      .then(val => {
        this.showErrorMessage("La encuesta se ha guardado exitosamente");
        this.nativeAudio.play('bien', () => console.log('Encuesta guardada'));
        this.navCtrl.setRoot(QuizManagerComponent);
      })
      .catch(error => {
        this.showErrorMessage("Los datos no pudieron ser procesados, intentelo nuevamente...");
        this.hideSpinner = true;
      });
  }


  showErrorMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  //---------------> Add/Delete options
  deleteOption(index) {
    if (this.options.length <= 3) {
      this.disableDeleteButton = true;
    }
    this.options.splice(index, 1);
  }

  add() {
    if (this.options.length >= 2) {
      this.disableDeleteButton = false;
    }
    let option = new Option();
    this.options.push(option);
  }
  //---------------//
}
