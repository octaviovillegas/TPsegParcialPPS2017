import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AppService } from "../../providers/app-service";
import { ViewChild } from '@angular/core';
import { Response } from "@angular/http";

import { Chart } from 'chart.js';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {

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

  getAssistsAndAbsenses() {
    this.storage.get("jwt").then(() => {

      this.classid = this.navParams.get("classid");

    }).catch(() => {
      console.log("Error");
    });
  }



}
