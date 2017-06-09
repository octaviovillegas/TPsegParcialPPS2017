import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { ClassesGridPage } from "../classes-grid-page/classes-grid-page";

@Component({
  selector: 'page-classrooms-list-page',
  templateUrl: 'classrooms-list-page.html',
})
export class ClassroomsListPage {
  classrooms: Array<any>;
  loadingPage: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService) {
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
}
