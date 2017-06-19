import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';

/**
* Generated class for the AcercaDePage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
    selector: 'page-acerca-de-page',
    templateUrl: 'acerca-de-page.html',
})
export class AcercaDePage {

    private device: Device;

    constructor(public navCtrl: NavController, public navParams: NavParams, private dev: Device) {
        this.device = dev;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AcercaDePage');
    }

}
