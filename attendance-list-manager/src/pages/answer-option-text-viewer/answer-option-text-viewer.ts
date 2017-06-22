import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
@Component({
  selector: 'page-answer-option-text-viewer',
  templateUrl: 'answer-option-text-viewer.html',
})
export class AnswerOptionTextViewer {
  student:any;
  question:string;
  questionId:number;
  options:Array<any>;
  userId:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
    this.student = {};
    this.question = "";
    this.questionId = -1;
    this.userId = -1;
  }

  ionViewDidLoad() {
    this.student = this.navParams.get("student");
    this.question = this.navParams.get("question");
    this.questionId = this.navParams.get("questionId");
    this.userId = this.student.userid;
    this.storage.get("jwt")
      .then(jwt => this.getOptionsByAnswerId(jwt))
      .catch(() => {
        console.log("No hay jwt");
      });
  }
  
  getOptionsByAnswerId(jwt){
    this.appService.getOptionsByAnswerId(jwt, this.userId, this.questionId)
      .then((response) => {
        let body = JSON.parse(response["_body"]);
        this.options = body.options;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
