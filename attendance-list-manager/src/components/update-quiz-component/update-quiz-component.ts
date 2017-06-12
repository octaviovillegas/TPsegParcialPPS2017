import { Component,OnInit } from '@angular/core';
import { NavController, ToastController,NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Survey } from "../../app/entities/survey";

@Component({
  selector: 'update-quiz-component',
  templateUrl: 'update-quiz-component.html'
})
export class UpdateQuizComponent implements OnInit  {
  
  text: string;
  surveys:Survey;
  surveyid:string;
  
  
  ngOnInit(){

  }
  constructor(public navPrms: NavParams,public storage:Storage,public appService:AppService) {
        this.surveyid=this.navPrms.get("surveyid");
        console.log(this.surveyid);
       this.surveys=new Survey();
      this.appService.getSurveyById(this.surveyid).then((response: Response) => {
            if (response.status == 200) {
             
              this.surveys = JSON.parse(response["_body"]);
              console.log(this.surveys);
            } else {
              console.log("error"); //No tiene permisos.
            }
          })
            .catch((error) => console.log("error"));


 }

recibir(){


}

}
