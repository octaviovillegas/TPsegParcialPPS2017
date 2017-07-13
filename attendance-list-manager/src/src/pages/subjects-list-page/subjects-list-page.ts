import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { StudentsListPage } from "../students-list-page/students-list-page";
import { DivisionsListPage } from "../divisions-list-page/divisions-list-page";

@Component({
  selector: 'page-subjects-list-page',
  templateUrl: 'subjects-list-page.html',
})
export class SubjectsListPage {
  loadingPage: boolean;
  subjects: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
    this.subjects = [];
    this.loadingPage = true;
  }

  ionViewDidLoad() {
    let previousView: ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if (previousView.name == "DivisionsListPage") {

      this.getSubjectsListByDivisionId(this.navParams.get("division").divisionid);

    } 
    else if (previousView.name == "RegisteredUserPage") {
      this.getAllSubjects();
    }
  }

  getSubjectsListByDivisionId(divisionId) {

    this.storage.get("jwt").then((jwt) => {
      this.appService.getSubjectsListByDivisionId(jwt, divisionId)
        .then((response) => {
          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.subjects = body.subjects;
          this.loadingPage = false;
          console.log(body);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Error al traer las materias");
      this.loadingPage = false;
    });
  }

  getAllSubjects() {
    this.storage.get("jwt").then((jwt) => {
      this.appService.getSubjectsList(jwt)
        .then((response) => {
          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.subjects = body.subjects;
          this.loadingPage = false;
          console.log(body);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Error al traer las materias");
      this.loadingPage = false;
    });
  }

  itemSelected(subject) {

    let previousView: ViewController = this.navCtrl.getPrevious(this.navCtrl.last());

    if (previousView.name == "DivisionsListPage") {

      let division = this.navParams.get("division");
      this.navCtrl.push(StudentsListPage, { subject, division });

    } 
    else if (previousView.name == "RegisteredUserPage") {
      this.navCtrl.push(DivisionsListPage, { subject });
    }
  }

}
