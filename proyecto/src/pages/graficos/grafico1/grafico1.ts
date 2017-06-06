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


cont1=0;
cont2=0;
cont3=0;
cont4=0;
val1="";
val2="";
val3="";
val4="";
contResp;
total: any[] = [];
graf1;

   prre=[{pr: "calidad de la materia2", re:"buena"},
      {pr: "calidad de la materia", re:"normal"},
      {pr: "calidad de la materia", re:"buena"},
      {pr: "calidad de la materia", re:"mala"}];

 
  chartLabels: string[] = [this.prre[0]['pr']];
  chartType: string = 'bar';
  chartLegend: boolean = true;
  chartData: any[] =this.total;
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
  
  pregs=[];
  preganterior=null;
  Unapregunta;
  conjAver=[];
      constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public viewCtrl: ViewController) 
      {
        //config

                      for (let pr of this.prre) {
                if(this.val1==""){this.val1=pr['re']}
                if(this.val1!="" && this.val2=="" && pr['re'] != this.val1){this.val2=pr['re']} 
                if(this.val1!="" && this.val2!=""&& this.val3=="" && pr['re'] != this.val2 && pr['re'] != this.val1){this.val3=pr['re']} 
                if(this.val1!="" && this.val2!=""&& this.val3!="" && this.val4=="" && pr['re'] != this.val2 && pr['re'] != this.val1 && pr['re'] != this.val3){this.val4=pr['re']} 
                  }


                  for (let pr of this.prre) {
                      if(pr['re'] == this.val1){this.cont1++;}
                      if(pr['re'] == this.val2){this.cont2++;}
                      if(pr['re'] == this.val3){this.cont3++;}
                      if(pr['re'] == this.val4){this.cont4++;}
                  }


                  if(this.cont3==0){
                    this.contResp=2;
                  }else if(this.cont4==0)
                  {
                    this.contResp=3;
                  }else{
                    this.contResp=4;
                  }

              

                  this.total.push({label:this.val1, data:[this.cont1]});
                  this.total.push({label:this.val2, data:[this.cont2]});
                  if(this.cont3!=0){
                    this.total.push({label:this.val3, data:[this.cont3]});
                  }
                  if(this.cont4!=0)
                  {
                    this.total.push({label:this.val4, data:[this.cont4]});
                  }
                  
                   
        //finconf   
        
        this.traerGraficos(); 

      }


    traerGraficos()
    {
      let pregunta=null; 
      
           this.http.get("http://tppps2.hol.es/ws1/GrafRespuestasDePreguntas")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.graf1 = quote;   
            console.info(this.graf1);   
             for(let g of this.graf1)
             {
               if(this.preganterior != g['descripcion'])
               {
                 this.preganterior=g['descripcion'];
                 this.pregs.push(this.preganterior);
                 this.Unapregunta=g['descripcion'];
               }
             }
             console.info(this.pregs);
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
      console.info(this.conjAver);

            for (let pr of this.conjAver) {
                if(this.val1==""){this.val1=pr['opcion']}
                if(this.val1!="" && this.val2=="" && pr['opcion'] != this.val1){this.val2=pr['opcion']} 
                if(this.val1!="" && this.val2!=""&& this.val3=="" && pr['opcion'] != this.val2 && pr['opcion'] != this.val1){this.val3=pr['opcion']} 
                if(this.val1!="" && this.val2!=""&& this.val3!="" && this.val4=="" && pr['opcion'] != this.val2 && pr['opcion'] != this.val1 && pr['opcion'] != this.val3){this.val4=pr['opcion']} 
                  }


                  for (let pr of this.conjAver) {
                      if(pr['opcion'] == this.val1){this.cont1++;}
                      if(pr['opcion'] == this.val2){this.cont2++;}
                      if(pr['opcion'] == this.val3){this.cont3++;}
                      if(pr['opcion'] == this.val4){this.cont4++;}
                  }


                  if(this.cont3==0){
                    this.contResp=2;
                  }else if(this.cont4==0)
                  {
                    this.contResp=3;
                  }else{
                    this.contResp=4;
                  }

              

                  this.total.push({label:this.val1, data:[this.cont1]});
                  this.total.push({label:this.val2, data:[this.cont2]});
                  if(this.cont3!=0){
                    this.total.push({label:this.val3, data:[this.cont3]});
                  }
                  if(this.cont4!=0)
                  {
                    this.total.push({label:this.val4, data:[this.cont4]});
                  }

    }
 

 


 
}
