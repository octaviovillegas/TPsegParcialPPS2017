import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
import Highcharts from 'highcharts'
/** 
 * Generated class for the ModificacionModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-grafico2',
  templateUrl: 'grafico2.html',
})
export class Grafico2
{


	constructor(public navCtrl: NavController,public http:Http) {
		this.traerdatos();
	
	}

	contResp;
	total: any[] = [];
	graf1;
	cursos=[];
	cursoanterior=null;
	Uncurso;
	conjAver=[];
  conjAver2=[];
	traerdatos()
	{
		 
		  this.http.get("http://tppps2.hol.es/ws1/GrafEncuestasPorCurso")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.graf1 = quote;   
            console.info(this.graf1);
             for(let g of this.graf1)
             {
				  
				  let num=g['cantidad_encuestas']; 
				  
				    this.conjAver.push({name:g['curso'], y:Number.parseInt(num), drilldown:g['curso']});
				
               if(this.cursoanterior != g['curso'])
               {
                 this.cursoanterior=g['curso'];
                 this.cursos.push(this.cursoanterior);
                
               }
             }
		 
		 
           });
           this.cursos.push("Todos");
           console.info(this.cursos);
	}

	onChange(event)
	{
    this.conjAver2=[];
    if(event=="Todos")
    {this.conjAver2=this.conjAver}
    else{
        for (let obj of this.conjAver) 
        {
            console.info(obj);
            console.info(event);
            if(obj['name']==event)
            {
              this.conjAver2.push(obj);
            }
            console.info(this.conjAver2);
        }
    }
    
			Highcharts.chart('container', {
				chart: {
					type: 'column'
				},
				title: {
					text: "Curso: "+event
				},
				xAxis: {
					type: 'category'
				},
				yAxis: {
					title: {
						text: 'cantidad de encuestas'
					}

				},
				legend: {
					enabled: false
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							format: '{point.y:1f}'
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b> of total<br/>'
				},

				series: [{
					name: 'Brands',
					colorByPoint: true,
					data: this.conjAver2
				}]
			});

	} 


}
