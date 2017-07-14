import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { ClassesGridPage } from "../classes-grid-page/classes-grid-page";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'page-classrooms-list-page',
  templateUrl: 'classrooms-list-page.html',
})
export class ClassroomsListPage {
  classrooms: Array<any>;
  loadingPage: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService,private settings:Settings, private alertCtrl: AlertController) {
    this.classrooms = [];
    this.loadingPage = true;
    this.getClassroomsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassroomsListPage');
  }

  getClassroomsList() {
    this.storage.get("jwt").then((jwt) => {
      this.appService.getClassroomsList(jwt)
        .then((response) => {

          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.classrooms = body.classrooms;
          this.loadingPage = false;
          console.log(body);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Error al traer las divisiones");
      this.loadingPage = false;
    })
  }

  itemSelected(classroom) {
    this.navCtrl.push(ClassesGridPage, { classroom });
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
