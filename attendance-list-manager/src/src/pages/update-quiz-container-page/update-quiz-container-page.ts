import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { HomePage } from "../home/home";



@Component({
  selector: 'page-update-quiz-container-page',
  templateUrl: 'update-quiz-container-page.html',
})
export class UpdateQuizContainerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
  }

  ionViewDidLoad() {
  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
