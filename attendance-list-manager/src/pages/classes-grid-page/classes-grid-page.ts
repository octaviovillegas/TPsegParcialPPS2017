import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { StudentsListPage } from "../students-list-page/students-list-page";
@Component({
  selector: 'page-classes-grid-page',
  templateUrl: 'classes-grid-page.html',
})
export class ClassesGridPage {
  classes: Array<any>;
  loadingPage: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private appService: AppService) {
    this.classes = [];
    this.loadingPage = true;
    
  }

  
  ionViewDidLoad() {
    let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if(previousView.name == "ClassroomsListPage"){
      this.getClassesByClassroomid();
    }else if(previousView.name == "SubjectsListPage"){
      //this.getListDivisionsBySubjectId(this.navParams.get("subject").subjectid);
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

  itemSelected(a_class){
    this.navCtrl.push(StudentsListPage, {a_class});
  }
}
