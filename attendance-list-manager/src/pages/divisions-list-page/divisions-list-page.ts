import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AppService } from "../../providers/app-service";
import { SubjectsListPage } from "../subjects-list-page/subjects-list-page";

@Component({
  selector: 'page-divisions-list-page',
  templateUrl: 'divisions-list-page.html',
})
export class DivisionsListPage {
  divisions:Array<any>;
  loadingPage:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private appService:AppService) {
    this.divisions = [];
    this.loadingPage = true;
    this.getListDivisions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionsListPage');
  }

  itemSelected(division){
    this.navCtrl.push(SubjectsListPage,{division});
  }

  getListDivisions(){
    this.storage.get("jwt").then((jwt)=>{
      this.appService.getAllDivisions(jwt)
      .then((response)=>{
        
        let body = JSON.parse(response["_body"]); //convert JSON to Object
        this.divisions = body.divisions;
        this.loadingPage = false;
        console.log(body);
      })
      .catch(()=>{
        console.log("Error");
        this.loadingPage = false;
      });
    }).catch(()=>{
      console.log("Error al traer las divisiones");
      this.loadingPage = false;
    })
  }
}
