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
/**
 * Generated class for the NewQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-quiz-component',
  templateUrl: 'new-quiz-component.html'
})
export class NewQuizComponent {
  toggleStatus: any;
  toggleStatus2: any;
  buttonStatus: any;
  form: FormGroup;
  jw: any;
  options: Array<Option>;
  hideSpinner: boolean;
   titleok:any;
  questionok:any;
  logEvent(e) {
    console.log(e)
  }
  opciones: any;
  constructor(public navCtrl: NavController, private storage: Storage, private toastCtrl: ToastController, private fb: FormBuilder, private vibration: Vibration, private appService: AppService, private alertCtrl: AlertController) {
    this.form = this.fb.group({
      Titulo: ["", [Validators.required]],
      Pregunta: ["", [Validators.required]],
      Fecha: ["", [Validators.required]],
      
    });
    this.options = [];
    this.fillDefaultsNumberOfOptions();
   this.hideSpinner = true;
}

  fillDefaultsNumberOfOptions(){
    let option1 = new Option();
    option1.isRight = false;
    let option2 = new Option();
 
    this.options.push(option1);
    this.options.push(option2);
  }
  add() {
    console.log('aca')
    let option = new Option();
    
    this.options.push(option);
  }

  ChangeToggle() {
    if (this.toggleStatus == true) {
      console.log("verdad");
    }
    else {
      console.log("falso");
    }
  }
  changeButton() {
    this.buttonStatus = true;

  }

  ChangeToggle2() {
    if (this.toggleStatus2 == true) {
      console.log("verdad");
    }
    else {
      console.log("falso");
    }


  }


  send() {
    console.log("Click en Enviar");
    let survey = new Survey();

    if(this.toggleStatus){
      this.options.forEach(itemInOptions => {
        let option = new Option();
        option.isRight = itemInOptions.isRight;
        option.text = itemInOptions.text;
        survey.question.options.push(option);
      });
      console.log(survey.question.options);
    }
  }
showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea guardar la Encuesta?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.getJwtForNewSurvey();
            this.vibration.vibrate(500);
            
              
              
          }
        }
      ]
    });
    confirm.present();
  }

  getJwtForNewSurvey() {
    this.hideSpinner = false;
    this.storage.get("jwt")
      .then(jwt => this.newSurvey(jwt))
      .catch(() => this.appService.logOut());
  }
  newSurvey(jwt) {
  this.titleok=this.form.get("Titulo").value;
 this.questionok=this.form.get("Pregunta").value;
 if(this.titleok==""||this.questionok==""){
this.showErrorMessage("Debe ingresar Titulo y Pregunta para guardar");

 }else{   let survey = new Survey();
    survey.endDate = this.form.get("Fecha").value;
    survey.title = this.form.get("Titulo").value;
    survey.question.text = this.form.get("Pregunta").value;

    if(this.toggleStatus){
 this.options.forEach(itemInOptions => {
        let option = new Option();
        option.isRight = itemInOptions.isRight;
        option.text = itemInOptions.text;
        survey.question.options.push(option);
      }); }
    this.showErrorMessage("Guardando encuesta");
    
      this.hideSpinner = true;
    this.appService.newSurvey(survey, jwt)
    
      .then(val =>{this.showErrorMessage("Encuesta Guardada");
      this.navCtrl.setRoot(QuizManagerComponent );})
      .catch(error => this.showErrorMessage("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  }}
showErrorMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

}
