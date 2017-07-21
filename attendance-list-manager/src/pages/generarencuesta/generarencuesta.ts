import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { Survey } from "../../app/entities/survey";
import {Option} from "../../app/entities/option";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'page-generarencuesta',
  templateUrl: 'generarencuesta.html',
 
})
export class generarencuesta {
   toggleStatus:any;
    toggleStatus2:any;
    buttonStatus:any;
      form: FormGroup;
      jw:any;
     
  logEvent(e) {
    console.log(e)
  }
 opciones:any;
  constructor(public navCtrl: NavController, private storage: Storage, private fb: FormBuilder, private appService: AppService) {
this.form = this.fb.group({
      Titulo: ["", [Validators.required]],
      Pregunta: ["", [Validators.required]],
       Respuesta1: ["", [Validators.required]],
        Respuesta2: ["", [Validators.required]],
         Respuesta3: ["", [Validators.required]],
          Fecha: ["", [Validators.required]],

    });
  }
ChangeToggle() {
  if(this.toggleStatus == true){
          console.log("verdad");
   }
   else{
          console.log("falso");
   }
}
changeButton(){
this.buttonStatus=true;

}

ChangeToggle2() {
  if(this.toggleStatus2 == true){
          console.log("verdad");
   }
   else{
          console.log("falso");
   }
}






getJwtForNewSurvey(){
   this.storage.get("jwt")
        .then(jwt=>this.newSurvey(jwt))
           .catch(()=>this.appService.logOut());
  }
   newSurvey(jwt){
     let survey = new Survey();
     survey.endDate = this.form.get("Fecha").value;
   survey.title = this.form.get("Titulo").value;
    survey.question.text = this.form.get("Pregunta").value;
    
      let option = new Option();
    option.isRight = true;
    option.text = this.form.get("Respuesta1").value;;

    let option2 = new Option();
    option2.isRight = false;
    option2.text = this.form.get("Respuesta2").value;;

    let option3 = new Option();
    option3.isRight = true;
    option3.text = this.form.get("Respuesta3").value;;

    survey.question.options.push(option);
    survey.question.options.push(option2);
    survey.question.options.push(option3);
    console.log(survey);
   this.appService.newSurvey(survey,jwt)
          .then(val=>console.log("Dejar de mostrar el spinner, habilitar los botones, etc..."))
           .catch(error=>console.log("Los datos no pudieron ser procesados, intentelo nuevamente..."));
   }
   


}
