import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-statistics-viewer',
  templateUrl: 'statistics-viewer.html',
})
export class StatisticsViewer {
  
  hideSpinner: boolean
  @ViewChild('barCanvas') barCanvas;
  data = [12, 19, 3, 5, 2, 3];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.getJWTForGetStatisticsForSurveyTypeFreeAnswer();
  }



  getStatisticsForSurveyTypeFreeAnswer(jwt) {
    let surveyid = this.navParams.get("surveyId");
    this.appService.getStatisticsForSurveyTypeFreeAnswer(jwt, surveyid)
      .then((response)=>{
        let body = JSON.parse(response["_body"]);
        console.log(body);
      })
      .catch((error)=>
      {
        console.log(error);
      });
  }

  getJWTForGetStatisticsForSurveyTypeFreeAnswer() {
    this.storage.get("jwt")
      .then(jwt => this.getStatisticsForSurveyTypeFreeAnswer(jwt))
      .catch(() => {
        console.log("No hay jwt");
      });
  }

  drawStatistics() {

    /*
    var myChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: this.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
  });
  
  */
  }



}
