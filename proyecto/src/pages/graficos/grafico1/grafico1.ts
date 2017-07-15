import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import {Http} from '@angular/http';
import Highcharts from 'highcharts'
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
export class Grafico1
{

    cargando = true;
usuarioLogueado;

	constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public auth: servicioAuth) {
		this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();
        this.traerdatos();


	}

	contResp;
	total: any[] = [];
	graf1;
	pregs=[];
	preganterior=null;
	Unapregunta;
	conjAver=[];
    pregsel;
  conjAver2=[];
   micolor;


traerMiEstilo()
{
  console.info(this.usuarioLogueado['id_usuario']);
  console.info(event);
   this.http.post("http://tppps2.hol.es/ws1/traerConfMiEstilo", {
            id_usuario:this.usuarioLogueado['id_usuario']
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);  
                        console.info(quote['estilo']);     
                        console.info(quote['nombre']);   
                        console.info(quote[0]['nombre']);   
                           if(quote[0]['nombre'] != "estilo1" && quote[0]['nombre'] != "estilo2" && quote[0]['nombre'] != "estilo3" && quote[0]['nombre'] != "estilo4")
                                {
                                this.micolor=quote[0]['codigocolor1']; 
                                }else{
                                this.micolor=quote[0]['nombre']; 
                                } 

                    });
                    
}


  traerdatos()
  {
      this.cargando = true;
      this.http.get("http://tppps2.hol.es/ws1/GrafRespuestasDePreguntas")
      .map(res => res.json())
      .subscribe((quote) => {
          this.cargando = false;
          this.graf1 = quote;

          for(let g of this.graf1)
          {

              let num=g['cantResp'];

              this.conjAver.push({name:g['opcion'], y:Number.parseInt(num), drilldown:g['opcion'],preg:g['descripcion']});

              if(this.preganterior != g['descripcion'])
              {
                  this.preganterior=g['descripcion'];
                  this.pregs.push(this.preganterior);

              }
          }
          

           this.cargando = false;
      }, error => {
          this.cargando = false;
      });
  }

	onChange(event)
	{
        this.pregsel=event;
        this.cargando = true;
        this.conjAver2=[];
        for (let obj of this.conjAver)
        {
            console.info(obj);
            console.info(event);
            if(obj['preg']==event)
            {
                this.conjAver2.push(obj);
            }
            console.info(this.conjAver2);
        }

        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: event
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'cantidad'
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

        this.cargando = false;
        console.info(this.conjAver2);
	}


}
