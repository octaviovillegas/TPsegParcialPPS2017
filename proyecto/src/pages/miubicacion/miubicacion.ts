import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-miubicacion',
  templateUrl: 'miubicacion.html',
})

export class Miubicacion {

 
    lat: number;
    lng: number;

    latUtn: number=-34.662460;
    longUtn:number=-58.364813;

  constructor(public navCtrl: NavController, public http:Http, private geolocation:Geolocation ) {
          
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
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    });

  }

     // this.http.post("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBk5RmvUDk6MYUG8tubwDGeSathGm61C9g", {
             
        // })
        // .map(res => res.json())
        // .subscribe((quote) =>{
        //   console.info("resu",quote);
     // });
 


}
