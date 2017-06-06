import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';

/**
 * Generated class for the ModificacionModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-grafico1',
  templateUrl: 'grafico1.html',
})
export class grafico1 
{



contResp;
total: any[] = [];
graf1;


chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
     scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
  };
 
 
  chartLabels: string[];
  chartType: string = 'bar';
  chartLegend: boolean = true;


  chartData: any[] ;
  
  
  pregs=[];
  preganterior=null;
  Unapregunta;
  conjAver=[];
      constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public viewCtrl: ViewController) 
      {
        this.traerGraficos(); 

      }


    traerGraficos()
    {
      let pregunta=null; 
      
           this.http.get("http://tppps2.hol.es/ws1/GrafRespuestasDePreguntas")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.graf1 = quote;   
             
             for(let g of this.graf1)
             {
               if(this.preganterior != g['descripcion'])
               {
                 this.preganterior=g['descripcion'];
                 this.pregs.push(this.preganterior);
                
               }
             }
           
           });
    
    }

    onChange(event)
    {
          this.conjAver=[];
          console.info(event);

          for(let g of this.graf1)
          {
            if(g.descripcion==event)
            {
              this.conjAver.push(g);
            }
          }
      
      
            for (let pr of this.conjAver)
             {
               let num:number=pr['cantResp'];
                  this.total.push({label:pr['opcion'], data:1});
            }
                  console.info(JSON.stringify(this.total));
                  this.chartLabels = event;
                  this.chartData=this.total;
                  console.info(this.chartData);
    }
 

 


 
}
