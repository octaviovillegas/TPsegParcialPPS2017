
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

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
  constructor(public navCtrl: NavController, public geolocation:Geolocation ) {
       this.geo=geolocation;
    geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
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
