import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { HomePage } from "../home/home";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";



@Component({
  selector: 'page-update-quiz-container-page',
  templateUrl: 'update-quiz-container-page.html',
})
export class UpdateQuizContainerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage,private settings:Settings, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
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
}
