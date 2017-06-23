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
   loadingPage: boolean;
  constructor( private appService: AppService, private storage: Storage) {
    this.loadingPage = true;
    this.text = 'Estás viendo el contenido del componente DeleteUserComponent';
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
         });


}

encodeRol(rol) {
    let rv;
    switch (rol) {
      case 1:
        rv = "Administrador";
        break;
      case 2:
        rv = "Profesor";
        break;
      case 3:
        rv = "Administrativo";
        break;
      default:
        rv = "Estudiante"
        break;
    }
    return rv;
  }

eliminar(userid){

this.appService.deleteUser(userid).then((response: Response) => {
            if (response.status == 200) {
              this.storage.get("jwt")
      .then((jwt) => {
this.appService.getUserListToEliminate(jwt).then((response: Response) => {
            if (response.status == 200) {
              this.users = JSON.parse(response["_body"]);
              this.loadingPage = false;
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
