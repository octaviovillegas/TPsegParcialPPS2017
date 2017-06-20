import { Component } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the DeleteUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'delete-user-component',
  templateUrl: 'delete-user-component.html'
})
export class DeleteUserComponent {

  text: string;
  users:Array<any>;
  constructor( private appService: AppService, private storage: Storage) {
    this.text = 'Estás viendo el contenido del componente DeleteUserComponent';
this.storage.get("jwt")
      .then((jwt) => {
this.appService.getUserListToEliminate(jwt).then((response: Response) => {
            if (response.status == 200) {
              this.users = JSON.parse(response["_body"]);
            } else {
              console.log("error"); //No tiene permisos.
            }
          })
            .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
         });


}
eliminar(userid){

this.appService.deleteUser(userid).then((response: Response) => {
            if (response.status == 200) {
              this.storage.get("jwt")
      .then((jwt) => {
this.appService.getUserListToEliminate(jwt).then((response: Response) => {
            if (response.status == 200) {
              this.users = JSON.parse(response["_body"]);
            } else {
              console.log("error"); //No tiene permisos.
            }
          })
            .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
         });

            } else {
              console.log("error"); //No tiene permisos.
            }
          })
}
}
