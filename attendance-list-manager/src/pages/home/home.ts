import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/toPromise";

import { LoginData } from "../../app/entities/loginData";
import { RegisteredUserPage } from "../../pages/registered-user/registered-user";
import {Settings} from '../../providers/settings';
import {  AlertController } from "ionic-angular";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  form: FormGroup;
  hideSpinner: boolean
selectedTheme:String;
  constructor(public navCtrl: NavController, private fb: FormBuilder, private toastCtrl: ToastController, private storage: Storage, private appService: AppService,private settings:Settings, private alertCtrl: AlertController) {
     this.settings.getActiveTheme().subscribe(val=> this.selectedTheme=val);
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.hideSpinner = true;
  }
toggleAppTheme(){
if(this.selectedTheme == 'dark-theme'){

this.settings.setActiveTheme('light-theme');

}else{


this.settings.setActiveTheme('dark-theme');



}


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

            this.storage.set("jwt", body.jwt).then(()=> this.navCtrl.setRoot(RegisteredUserPage)); //set data into storage
            this.storage.set("rol", body.rol);
            
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
      position: "bottom"
    });
    toast.present();
  }

  getFormData(): LoginData {
    return new LoginData(
      this.form.get("email").value,
      this.form.get("password").value
    );
  }

  setSelectedLoginData(value){
    this.form.get("email").setValue(value);
    this.form.get("password").setValue(123456);
  }

}

