import { Component } from '@angular/core';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Vibration } from '@ionic-native/vibration';
import { ToastController, AlertController } from "ionic-angular";

import { NativeAudio } from '@ionic-native/native-audio';
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
  constructor( private appService: AppService, private storage: Storage, private toastCtrl: ToastController, private nativeAudio: NativeAudio, private vibration: Vibration, private alertCtrl: AlertController) {
    this.nativeAudio.preloadSimple('bien', 'assets/sound/ok.mp3');
    this.nativeAudio.preloadSimple('error', 'assets/sound/2.mp3');
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
 showConfirm(userid) {
    let confirm = this.alertCtrl.create({
      title: '¿Desea eliminar este Usuario?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.vibration.vibrate(500);
            this.eliminar(userid)
          }
        }
      ]
    });
    confirm.present();
  }
eliminar(userid){

this.appService.deleteUser(userid).then((response: Response) => {
            if (response.status == 200) {
              this.showMessage("Borrando Encuesta");
             this.vibration.vibrate(500);
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

showMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

}
