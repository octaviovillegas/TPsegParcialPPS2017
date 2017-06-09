import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { Survey } from "../../app/entities/survey";
import { Option } from "../../app/entities/option";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
  logEvent(e) {
    console.log(e)
  }
  opciones: any;
  constructor(public navCtrl: NavController, private storage: Storage, private fb: FormBuilder, private appService: AppService) {
    this.form = this.fb.group({
      Titulo: ["", [Validators.required]],
      Pregunta: ["", [Validators.required]],
      Fecha: ["", [Validators.required]],
      
    });
    this.options = [];
    this.fillDefaultsNumberOfOptions();
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


  getJwtForNewSurvey() {
    this.storage.get("jwt")
      .then(jwt => this.newSurvey(jwt))
      .catch(() => this.appService.logOut());
  }
  newSurvey(jwt) {
    let survey = new Survey();
    survey.endDate = this.form.get("Fecha").value;
    survey.title = this.form.get("Titulo").value;
    survey.question.text = this.form.get("Pregunta").value;

    
 this.options.forEach(itemInOptions => {
        let option = new Option();
        option.isRight = itemInOptions.isRight;
        option.text = itemInOptions.text;
        survey.question.options.push(option);
      });
    console.log(survey);
     console.log(survey.question.options);
    this.appService.newSurvey(survey, jwt)
      .then(val => console.log("Dejar de mostrar el spinner, habilitar los botones, etc..."))
      .catch(error => console.log("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  }

}
