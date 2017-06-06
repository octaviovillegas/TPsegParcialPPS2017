import { Component } from '@angular/core';
import { Survey } from "../../app/entities/survey";
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
/**
 * Generated class for the DeleteQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'delete-quiz-component',
  templateUrl: 'delete-quiz-component.html'
})
export class DeleteQuizComponent {

  text: string;
 Encuestas:any;
 surveys:Array<any>;
 
  constructor(private appService: AppService) {
    console.log('Hello DeleteQuizComponent Component');
    this.text = 'Estás viendo el contenido del componente DeleteQuizComponent';
 this.appService.getSurveys().then((response: Response) => {

        if (response.status == 200) {
         this.surveys = JSON.parse(response["_body"]);

         
        } else {
          console.log("error"); //No tiene permisos.
        }
      })
       .catch((error) =>console.log("error")); //Si por alguna razón el servidor no responde.
  }

// eliminar(){


// this.appService.eliminatesurvey().then((response: Response) => {

//         if (response.status == 200) {
//          this.surveys = JSON.parse(response["_body"]);

         
//         } else {
//           console.log("error"); //No tiene permisos.
//         }
//       })
//        .catch((error) =>console.log("error")); //Si por alguna razón el servidor no responde.
//   }



// }



}
