import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { StudentsListPage } from "../students-list-page/students-list-page";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'page-classes-grid-page',
  templateUrl: 'classes-grid-page.html',
})
export class ClassesGridPage {
  classes: Array<any>;
  loadingPage: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService,private settings:Settings, private alertCtrl: AlertController) {
    this.classes = [];
    this.loadingPage = true;
    
  }

  
  ionViewDidLoad() {
    let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if(previousView.name == "ClassroomsListPage"){
      this.getClassesByClassroomid();
    }else if(previousView.name == "TeachersListPage"){
      this.getClassesByTeacherId();
    }else if(previousView.name == "RegisteredUserPage"){
      this.getClassesByVerifyingJWT();
    }
  }

  getClassesByClassroomid(){
    
    this.storage.get("jwt").then((jwt) => {
      this.appService.getClassesListByClassroomid(jwt,this.navParams.get("classroom").classroomid)
        .then((response) => {

          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.classes = body.classes;
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

  getClassesByTeacherId(){
    this.storage.get("jwt").then((jwt) => {
      this.appService.getClassesByTeacherId(jwt,this.navParams.get("teacher").teacherid)
        .then((response) => {

          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.classes = body.classes;
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

  getClassesByVerifyingJWT(){
    this.storage.get("jwt").then((jwt) => {
      this.appService.getuserid(jwt)
        .then((response) => {

          let teacherid = JSON.parse(response["_body"]); //convert JSON to Object
          this.getClassesByUserId(teacherid);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Problemas para identificar al usuario.");
      this.loadingPage = false;
    })

  }

  getClassesByUserId(teacherid){
    this.storage.get("jwt").then((jwt) => {
      this.appService.getClassesByTeacherId(jwt,teacherid)
        .then((response) => {

          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.classes = body.classes;
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

  itemSelected(a_class){
    this.navCtrl.push(StudentsListPage, {a_class});
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
