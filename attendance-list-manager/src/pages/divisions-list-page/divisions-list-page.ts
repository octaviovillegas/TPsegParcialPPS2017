import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AppService } from "../../providers/app-service";
import { SubjectsListPage } from "../subjects-list-page/subjects-list-page";
import { StudentsListPage } from "../students-list-page/students-list-page";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'page-divisions-list-page',
  templateUrl: 'divisions-list-page.html',
})
export class DivisionsListPage {
  divisions: Array<any>;
  loadingPage: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService,private settings:Settings, private alertCtrl: AlertController) {
    this.divisions = [];
    this.loadingPage = true;
    
  }

  ionViewDidLoad() {
    let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if(previousView.name == "RegisteredUserPage"){
      this.getListDivisions();
    }else if(previousView.name == "SubjectsListPage"){
      this.getListDivisionsBySubjectId(this.navParams.get("subject").subjectid);
    }
  }

  ionViewWillEnter() {
    
  }
  
  itemSelected(division) {
    
    let previousView: ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if (previousView.name == "SubjectsListPage") {

      let subject = this.navParams.get("subject");
      this.navCtrl.push(StudentsListPage, { subject, division });

    } 
    else if (previousView.name == "RegisteredUserPage") {
      this.navCtrl.push(SubjectsListPage, { division });
    }
  }

  logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
  getListDivisions() {
    this.storage.get("jwt").then((jwt) => {
      this.appService.getAllDivisions(jwt)
        .then((response) => {

          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.divisions = body.divisions;
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
  getListDivisionsBySubjectId(subjectid) {
    this.storage.get("jwt").then((jwt) => {
      this.appService.getDivisionsListBySubjectId(jwt ,subjectid)
        .then((response) => {

          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.divisions = body.divisions;
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
}
