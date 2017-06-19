import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { ClassesGridPage } from "../classes-grid-page/classes-grid-page";
@Component({
  selector: 'page-teachers-list-page',
  templateUrl: 'teachers-list-page.html',
})
export class TeachersListPage {
  loadingPage: boolean;
  teachers: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
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
}


