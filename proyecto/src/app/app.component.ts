import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Login} from "../pages/login/login";
import { TabsPage } from '../pages/tabs/tabs';
import { GrillaComision } from '../pages/grillas/grilla-comision/grilla-comision';
import {Profesor} from "../pages/profesor/profesor";
import {Encuestas} from '../pages/encuestas/encuestas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = GrillaComision; //Login; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
