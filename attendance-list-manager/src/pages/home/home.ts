import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/toPromise";

import { LoginData } from "../../app/entities/loginData";
import { RegisteredUserPage } from "../../pages/registered-user/registered-user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  form: FormGroup;
  hideSpinner: boolean

  constructor(public navCtrl: NavController, private fb: FormBuilder, private toastCtrl: ToastController, private storage: Storage, private appService: AppService) {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
    this.hideSpinner = true;
  }


  login() {

    //show spinner UX
    this.hideSpinner = false;
    
    //get form data
    let loginData = this.getFormData();

      this.appService.getToken(loginData)
        .then((response: Response) => {
          
          this.hideSpinner = true;

          if (response.status == 200) {
            
            let body = JSON.parse(response["_body"]); //convert JSON to Object

            this.storage.set("jwt", body.jwt); //set data into storage
            this.storage.set("rol", body.rol);
            this.navCtrl.setRoot(RegisteredUserPage);

          } else {
            this.showErrorMessage("El usuario no ha sido encontrado"); //If the user is not found, the status is 204.
          }
        })
        .catch(() => {
          this.hideSpinner = true
          this.showErrorMessage("Error en la conexión con la base de datos"); //If the connection to the database fails.
        });
  }

  showErrorMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  getFormData(): LoginData {
    return new LoginData(
      this.form.get("email").value,
      this.form.get("password").value
    );
  }

}

