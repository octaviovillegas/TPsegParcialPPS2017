import { Component } from '@angular/core';
import { Survey } from "../../app/entities/survey";
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Option } from "../../app/entities/option";
import { NavController, ToastController } from 'ionic-angular';
import { UpdateQuizComponent } from '../update-quiz-component/update-quiz-component';
/**
 * Generated class for the ModifyQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'modify-quiz-component',
  templateUrl: 'modify-quiz-component.html'
})
export class ModifyQuizComponent {

  text: string;
surveys: Array<any>;
  constructor( private storage: Storage, private appService: AppService,private navCtrl:NavController) {
     this.storage.get("jwt")
      .then((jwt) => {
        this.appService.getSurveysToEliminate(jwt).then((response: Response) => {

          if (response.status == 200) {
            this.surveys = JSON.parse(response["_body"]);

          } else {
            console.log("error"); //No tiene permisos.
          }
        })
          .catch((error) => console.log("error")); //Si por alguna razón el servidor no responde.
        //Si por alguna razón el servidor no responde.
      });
  }
modify(){

this.navCtrl.setRoot(UpdateQuizComponent);

}
}
