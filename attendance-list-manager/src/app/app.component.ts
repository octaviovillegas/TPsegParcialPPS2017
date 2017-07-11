import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage} from '../pages/home/home'
import {Settings} from '../providers/settings';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
selectedTheme:String;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private settings:Settings) {
     this.settings.getActiveTheme().subscribe(val=> this.selectedTheme=val);

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
