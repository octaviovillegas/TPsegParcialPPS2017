import { Component,OnInit } from '@angular/core';
import { NavController, ToastController,NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Survey } from "../../app/entities/survey";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { Option } from "../../app/entities/option";
import { QuizManagerComponent } from '../quiz-manager-component/quiz-manager-component';
@Component({
  selector: 'update-quiz-component',
  templateUrl: 'update-quiz-component.html'
})
export class UpdateQuizComponent implements OnInit  {
  
  text: string;
  survey:any;
  surveyid:string;
 form: FormGroup;
  title:any;
  question:any
  fech:any;
  options:Array<any>;
titleok:any;
  questionok:any;
  ngOnInit(){

  }
  constructor(public navPrms: NavParams ,private nativeAudio: NativeAudio , private vibration: Vibration ,public storage:Storage,public appService:AppService, private fb: FormBuilder,public navCtrl: NavController, private toastCtrl: ToastController) {
         this.form = this.fb.group({
      Titulo: ["", [Validators.required]],
      Pregunta: ["", [Validators.required]],
      Fecha: ["", [Validators.required]],
      
    });
    this.showErrorMessage("Cargando datos");
        this.surveyid=this.navPrms.get("surveyid");
        console.log(this.surveyid);
     
      this.appService.getSurveyById(this.surveyid).then((response: Response) => {
            if (response.status == 200) {
             
              this.survey = JSON.parse(response["_body"]);
           
           this.lalalala();
            } else {
              console.log("error"); //No tiene permisos.
            }
          })
            .catch((error) => console.log("error"));



 }
 showErrorMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
 add() {
    console.log('aca')
    let option = new Option();
    
    this.options.push(option);
  }
lalalala(){
this.title=this.survey.survey.title;
this.question=this.survey.survey.text;
this.fech=this.survey.survey.enddate;
this.options=this.survey.options;
 console.log(this.survey);

}
 modifySurvey() {
  
this.nativeAudio.play('error', () => console.log('bienvenida is done playing'));


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
    this.showErrorMessage("Guardando encuesta");
    
     
    this.appService.modifySurvey(survey)
    
      .then(val =>{this.showErrorMessage("Encuesta Guardada");
      this.nativeAudio.play('bien', () => console.log('bienvenida is done playing'));
      this.navCtrl.setRoot(QuizManagerComponent );})
      .catch(error => this.showErrorMessage("Los datos no pudieron ser procesados, intentelo nuevamente..."));
  }
Modificar()
{}
}
