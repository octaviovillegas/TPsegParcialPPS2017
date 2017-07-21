import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage,private settings:Settings, private alertCtrl: AlertController) {
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
