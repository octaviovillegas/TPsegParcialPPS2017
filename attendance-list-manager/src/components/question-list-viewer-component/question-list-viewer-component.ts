import { Component, OnInit } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { Response } from "@angular/http";
@Component({
  selector: 'question-list-viewer-component',
  templateUrl: 'question-list-viewer-component.html'
})
export class QuestionListViewerComponent implements OnInit{
  hideSpinner: boolean
  text: string;
  surveys:Array<any>;
  JWT:string;
  constructor(private appService:AppService, private storage: Storage) {
    this.hideSpinner = false;
  

    this.storage.get("jwt")
      .then((jwt) => {
     this.appService.getSurveys(jwt).then((response: Response) => {
      if (response.status == 200) { this.JWT=JSON.parse(response["_body"]);} else {
          console.log("errorno permisions"); //No tiene permisos.
        }
      
 }
      )
       .catch((error) =>console.log("error")); //Si por alguna razón el servidor no responde.
   });}
  ngOnInit(): void {
    this.appService.getSurveys(this.JWT)
    .then((response)=>{
      this.hideSpinner = true;
      let body = JSON.parse(response["_body"]);
      this.surveys = body;
    })
    .catch(()=>{
      this.hideSpinner = true;
      console.log("Error")});
  }

}
