import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { StudentsListPage } from "../students-list-page/students-list-page";

@Component({
  selector: 'page-subjects-list-page',
  templateUrl: 'subjects-list-page.html',
})
export class SubjectsListPage {
  loadingPage:boolean;
  subjects:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService:AppService, private storage:Storage) {
    this.subjects = [];
    this.loadingPage = true;
    this.getSubjectsListByDivisionId();
  }

  ionViewDidLoad() {
   
  }

  getSubjectsListByDivisionId(){
    
      this.storage.get("jwt").then((jwt)=>{
      let division = this.navParams.get("division");
      this.appService.getSubjectsListByDivisionId(jwt,division.divisionid)
      .then((response)=>{
        
        let body = JSON.parse(response["_body"]); //convert JSON to Object
        this.subjects = body.subjects;
        this.loadingPage = false;
        console.log(body);
      })
      .catch(()=>{
        console.log("Error");
        this.loadingPage = false;
      });
    }).catch(()=>{
      console.log("Error al traer las materias");
      this.loadingPage = false;
    });
  }

  itemSelected(subject){
    let division = this.navParams.get("division");
    this.navCtrl.push(StudentsListPage,{subject, division});
  }

}
