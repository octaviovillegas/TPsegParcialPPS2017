import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { ClassesGridPage } from "../classes-grid-page/classes-grid-page";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";

@Component({
  selector: 'page-teachers-list-page',
  templateUrl: 'teachers-list-page.html',
})
export class TeachersListPage {
  loadingPage: boolean;
  teachers: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage,private settings:Settings, private alertCtrl: AlertController) {
    this.teachers = [];
    this.loadingPage = true;
    
  }

  ionViewDidLoad() {
    this.getTeachersList();
  }

  getTeachersList(){
    this.storage.get("jwt").then((jwt) => {
      this.appService.getTeachersList(jwt)
        .then((response) => {
          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.teachers = body.teachers;
          this.loadingPage = false;
          console.log(body);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Error al traer los profesores");
      this.loadingPage = false;
    });
  }


  itemSelected(teacher){
    console.log(teacher);
    this.navCtrl.push(ClassesGridPage, {teacher});
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


