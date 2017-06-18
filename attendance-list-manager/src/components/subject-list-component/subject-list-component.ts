import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AppService } from "../../providers/app-service";
import { AssistAndAbsences } from "../../pages/assist-and-absences/assist-and-absences";

@Component({
  selector: 'subject-list-component',
  templateUrl: 'subject-list-component.html'
})
export class SubjectListComponent {

  loadingPage: boolean;
  subjects: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
    this.subjects = [];
    this.loadingPage = true;
  }

  ionViewDidLoad() {
      this.getSubjectsListByStudentId();
  }

  getSubjectsListByStudentId() {

    this.storage.get("jwt").then((jwt) => {
      this.appService.getSubjectsListByStudentId(jwt)
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
    this.navCtrl.parent.push(AssistAndAbsences, { classid: subject.classid });
  }

}
