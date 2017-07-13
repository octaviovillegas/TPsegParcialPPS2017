import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { User } from "../../app/entities/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { Option } from "../../app/entities/option";
import { NewUserData } from "../../app/entities/newUserData";
import {Settings} from '../../providers/settings';

@Component({
  selector: 'update-user-component',
  templateUrl: 'update-user-component.html'
})
export class UpdateUseromponent implements OnInit {


  userid: number;
  userid2: number;
  form: FormGroup;
 user:any;
   roles: Array<string>
hideSpinner: boolean;

roluser:any;
  ngOnInit() {
 this.setUserTypesByCurrenRol();
  }

  constructor(public navPrms: NavParams, private nativeAudio: NativeAudio, private vibration: Vibration, public storage: Storage, public appService: AppService, private fb: FormBuilder, public navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController,private settings:Settings) {
     this.hideSpinner = true;
     this.nativeAudio.preloadSimple('actualizacion', 'assets/sound/escribe.mp3');
      this.nativeAudio.preloadSimple('error', 'assets/sound/2.mp3');
     this.roles = [];
    this.userid=0;
    this.form = this.fb.group({
      //user table
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      filenumber: "",
      rol: ["", [Validators.required]],

      //address table
      street: ["", [Validators.required]],
      number: ["", [Validators.required]],
      city: ["", [Validators.required]],
      floor: "",
      department: "",
      clarification: "",
    });
    
   this.userid=this.navPrms.get("userid");
   console.log(this.userid);
    
this.appService.getUserById(this.userid)
      .then((response: Response) => {
        if (response.status == 200) {
//this.user = JSON.parse(response["_body"]);
 let body = JSON.parse(response["_body"]);
          console.log(body);
          this.user = body.user;
         this.objectToForm();
          console.log(this.user[0]);
        
        } else {
          console.log("allalala");
        }
      })
      .catch((error) => {
        
      });

  }
    showConfirm2() {
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
objectToForm() {
    this.form.get("firstname").setValue(this.user[0].firstname);
    this.form.get("lastname").setValue(this.user[0].lastname);
      this.form.get("lastname").setValue(this.user[0].lastname);
        this.form.get("username").setValue(this.user[0].username);
          this.form.get("password").setValue(this.user[0].password);
            this.form.get("filenumber").setValue(this.user[0].filenumber);
              this.roluser=this.user[0].rol;
              console.log(this.roluser);
               this.form.get("email").setValue(this.user[0].email);
       this.form.get("street").setValue(this.user[0].street);
       this.form.get("number").setValue(this.user[0].number);
       this.form.get("city").setValue(this.user[0].city);
       this.form.get("floor").setValue(this.user[0].floor);
  this.form.get("department").setValue(this.user[0].department);
  this.form.get("clarification").setValue(this.user[0].clarification);
this.userid2=this.user[0].userid;
   
  }


 setUserTypesByCurrenRol() {
    this.storage.get("rol").then((rol) => {
      let roles = ["Profesor", "Alumno"]
      if (rol == "Administrator") {
        roles.push("Administrador", "Administrativo");
      }
      this.roles = roles;
    });
  }
 showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea Guardar?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.storage.get("jwt")
              .then(jwt => this.modifyUser())
              .catch(() => {
                this.showErrorMessage("Usuario no válido");
                
                //No tiene credenciales
              });
          }
        }
      ]
    });
    confirm.present();
  }
  formToObject(){
let user = new NewUserData();
user.userid=this.userid2;
user.username=this.form.get("username").value;
user.firstname= this.form.get("firstname").value;
 user.lastname= this.form.get("lastname").value;
    user.email=this.form.get("email").value;
       user.password=this.form.get("password").value;
          user.filenumber=  this.form.get("filenumber").value;
         user.rol=  this.encodeRol(this.form.get("rol").value)
           user.street=this.form.get("street").value;
       user.number=this.form.get("number").value;
       user.city=this.form.get("city").value;
       user.floor=this.form.get("floor").value;
       user.department=this.form.get("department").value;
  user.clarification=this.form.get("clarification").value;
console.log(user);
 return user;


}

 encodeRol(rol) {
    let rv;
    switch (rol) {
      case "Administrador":
        rv = "Administrator";
        break;
      case "Profesor":
        rv = "Teacher";
        break;
      case "Administrativo":
        rv = "Administrative";
        break;
      default:
        rv = "Student"
        break;
    }
    return rv;
  }


modifyUser() {
    this.hideSpinner = false;
    let user = this.formToObject();
    this.appService.modifyUser(user).then((response) => {
      this.hideSpinner = true;
      if (response.status == 200) {
        this.showErrorMessage("El usuario ha sido creado exitosamente");
        this.nativeAudio.play('actualizacion', () => console.log('ok'));
        this.vibration.vibrate(500);
        this.form.reset();
      } else {
        this.showErrorMessage("No tiene permisos para realizar esta acción"); //No tiene permisos.
      }
    }).catch(() => {
      this.showErrorMessage("El alta no pudo ser procesada, por favor intentelo nuevamente");

      this.hideSpinner = true;
       this.nativeAudio.play('error', () => console.log('Encuesta guardada'));
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
}
