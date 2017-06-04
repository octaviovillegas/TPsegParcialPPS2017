import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-update-quiz-container-page',
  templateUrl: 'update-quiz-container-page.html',
})
export class UpdateQuizContainerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateQuizContainerPage');
  }

}
