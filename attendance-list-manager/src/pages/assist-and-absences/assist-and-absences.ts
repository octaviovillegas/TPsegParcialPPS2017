import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AppService } from "../../providers/app-service";
@Component({
  selector: 'page-assist-and-absences',
  templateUrl: 'assist-and-absences.html',
})
export class AssistAndAbsences implements OnInit{
  assists: number;
  absences:number;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private appService: AppService, private storage: Storage) {
    this.assists = 0;
    this.absences = 0;
  }

  ngOnInit(): void {
    this.getAssistsAndAbsenses();
  }

  getAssistsAndAbsenses(){
    this.storage.get("jwt").then(()=>{
        console.log(this.navParams.get("classid"));
    }).catch(()=>{
      console.log("Error");
    });
  }

  ionViewDidLoad() {

  }

}
