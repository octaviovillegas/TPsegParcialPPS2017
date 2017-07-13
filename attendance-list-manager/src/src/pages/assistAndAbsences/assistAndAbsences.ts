import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
@Component({
  selector: 'assistAndAbsences',
  templateUrl: 'assistAndAbsences.html'
})
export class assistAndAbsences {
@ViewChild('barCanvas') barCanvas;
 
    barChart: any;
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
 
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["inasistencias", "asistencias"],
                datasets: [{
                    label: 'En lo que va de la cursada',
                    data: [10, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        
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
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });}
}
