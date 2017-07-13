import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-answer-text-viewer',
  templateUrl: 'answer-text-viewer.html',
})
export class AnswerTextViewer {
  student:any;
  question:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = {};
    this.question = "";
  }

  ionViewDidLoad() {
    this.student = this.navParams.get("student");
    this.question = this.navParams.get("question");
  }

}
