import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Settings} from '../../providers/settings';

import {  AlertController } from "ionic-angular";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
selectedTheme:String;
  constructor(public navCtrl: NavController,private settings:Settings, private alertCtrl: AlertController) {
  this.settings.getActiveTheme().subscribe(val=> this.selectedTheme=val);
  }
showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Elija un estilo',
      message: '',
      buttons: [
        {
          text: 'Cold-theme',
          handler: () => {this.encodeStyle('dark-theme'); 
          }
        },
        {
          text: 'Brown-theme',
          handler: () => { this.encodeStyle('brown-theme');
             
              
          }
        }
      ]
    });
    confirm.present();
  }
  encodeStyle(Style) {
    let rv;
    switch (Style) {
      case "dark-theme":
        this.settings.setActiveTheme('dark-theme');
        break;
      case "brown-theme":
        this.settings.setActiveTheme('brown-theme');
        break;
      
      default:
       this.settings.setActiveTheme('button-light')
        break;
    }
    
  }
toggleAppTheme(){
if(this.selectedTheme == 'dark-theme'){

this.settings.setActiveTheme('brown-theme');

}else{


this.settings.setActiveTheme('dark-theme');



}


}
}
