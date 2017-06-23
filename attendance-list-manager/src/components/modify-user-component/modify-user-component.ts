import { Component } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Vibration } from '@ionic-native/vibration';
import { NavController} from 'ionic-angular';
import {UpdateUseromponent} from "../update-user-component/update-user-component";

/**
 * Generated class for the ModifyUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'modify-user-component',
  templateUrl: 'modify-user-component.html'
})
export class ModifyUserComponent {

  text: string;

  users:Array<any>;
  loadingPage:boolean;
  constructor( private appService: AppService, private storage: Storage, private navCtrl: NavController) {
    this.loadingPage = true;
    console.log('Hello ModifyUserComponent Component');
    this.text = 'Estás viendo el contenido del componente ModifyUserComponent';
  this.storage.get("jwt")
      .then((jwt) => {
this.appService.getUserListToEliminate(jwt).then((response: Response) => {
            if (response.status == 200) {
              this.users = JSON.parse(response["_body"]);
              this.loadingPage = false;
            } else {
              console.log("error"); //No tiene permisos.
              this.loadingPage = false;
            }
          })
            .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
       this.loadingPage = false;
        });



}
modificar(userid){
  this.navCtrl.parent.push(UpdateUseromponent, { userid });
}
}
