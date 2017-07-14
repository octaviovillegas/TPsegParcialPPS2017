import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
import { AppService } from "../../providers/app-service";
@Component({
  selector: 'page-answer-text-viewer',
  templateUrl: 'answer-text-viewer.html',
})
export class AnswerTextViewer {
  student:any;
  question:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,private settings:Settings, private alertCtrl: AlertController, private appService: AppService) {
    this.student = {};
    this.question = "";
  }
logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Elija un estilo',
      message: '',
      buttons: [
        {
          text: 'Cold-theme',
          handler: () => {this.encodeStyle('dark-theme'); 
          }
        },
        {
          text: 'Brown-theme',
          handler: () => { this.encodeStyle('brown-theme');
             
              
          }
        }
      ]
    });
    confirm.present();
  }
  encodeStyle(Style) {
    let rv;
    switch (Style) {
      case "dark-theme":
        this.settings.setActiveTheme('dark-theme');
        break;
      case "brown-theme":
        this.settings.setActiveTheme('brown-theme');
        break;
      
      default:
       this.settings.setActiveTheme('button-light')
        break;
    }
    
  }
  ionViewDidLoad() {
    this.student = this.navParams.get("student");
    this.question = this.navParams.get("question");
  }

}
