
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';

@Component({
  selector: 'page-miubicacion',
  templateUrl: 'miubicacion.html',
})

export class Miubicacion {

 
    lat: number;
    lng: number;

    latUtn: number=-34.662460;
    longUtn:number=-58.364813;
    geo:Geolocation;
     micolor;
     usuarioLogueado;
    cargando=true;
  constructor(public http:Http, public auth: servicioAuth, public navCtrl: NavController, public geolocation:Geolocation ) {
       this.geo=geolocation;
       this.cargar();
          this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();

  }



traerMiEstilo()
{
  this.cargando=true;
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
                        this.cargando=false;
                    });
                    
}



cargar()
{
   this.geo.getCurrentPosition().then((resp) => {
    
    console.info(resp['coords']['latitude']);
    this.lat=resp['coords']['latitude'];
    console.info(resp['coords']['longitude']);
    this.lng=resp['coords']['longitude'];
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.info(data);
 
    });
}
   
 


}
