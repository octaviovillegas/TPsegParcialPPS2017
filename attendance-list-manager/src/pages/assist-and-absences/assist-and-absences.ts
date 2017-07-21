import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AppService } from "../../providers/app-service";
import { ViewChild } from '@angular/core';
import { Response } from "@angular/http";

import { Chart } from 'chart.js';
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'page-assist-and-absences',
  templateUrl: 'assist-and-absences.html',
})
export class AssistAndAbsences implements OnInit {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  assists: number;
  absences: number;

  classid: any;
  assistandabsences: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage,private settings:Settings, private alertCtrl: AlertController) {

    this.assists = 0;
    this.absences = 0;

  }

  ngOnInit(): void {
    this.getAssistsAndAbsenses();

    this.storage.get("jwt")
      .then((jwt) => {
        this.appService.getAssist(jwt, this.classid).then((response: Response) => {
          if (response.status == 200) {
            this.assistandabsences = JSON.parse(response["_body"]);
            this.assistandabsences.forEach(element => {
              if (element.present == 1) {

                this.assists = this.assists + 1;

              } if (element.present == 0) {

                this.absences = this.absences + 1;

              }

              this.barChart = new Chart(this.barCanvas.nativeElement, {

                type: 'bar',
                data: {
                  labels: ["Inasistencias", "Asistencias"],
                  datasets: [{
                    label: 'En lo que va de la cursada',
                    data: [this.absences, this.assists],
                    backgroundColor: [
                      'rgba(159, 39, 21 , 0.2)',
                      'rgba(25, 141, 19 , 0.2)',

                    ],
                    borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',

                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }

              });




            });

          } else {
            console.log("error"); //No tiene permisos.
          }





        })
          .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
      });

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
  getAssistsAndAbsenses() {
    this.storage.get("jwt").then(() => {

      this.classid = this.navParams.get("classid");

    }).catch(() => {
      console.log("Error");
    });
  }



}
