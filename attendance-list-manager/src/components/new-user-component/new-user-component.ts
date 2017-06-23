import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewUserData } from "../../app/entities/newUserData";
import { AppService } from "../../providers/app-service";
import { ToastController, AlertController } from "ionic-angular";
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
@Component({
  selector: 'new-user-component',
  templateUrl: 'new-user-component.html'
})
export class NewUserComponent implements OnInit {
  text: string;
  roles: Array<string>
  form: FormGroup;
  hideSpinner: boolean

  ngOnInit(): void {
    this.setUserTypesByCurrenRol();
  }

  constructor(private storage: Storage,private nativeAudio: NativeAudio, private vibration: Vibration, private fb: FormBuilder, private appService: AppService, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.roles = [];
    this.hideSpinner = true;
      this.nativeAudio.preloadSimple('bien', 'assets/sound/ok.mp3');
    this.nativeAudio.preloadSimple('error', 'assets/sound/2.mp3');
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

  formToObject() {
    let user = new NewUserData();

    //new user data
    user.username = this.form.get("username").value;
    user.firstname = this.form.get("firstname").value;
    user.lastname = this.form.get("lastname").value;
    user.email = this.form.get("email").value;
    user.password = this.form.get("password").value;
    user.filenumber = this.form.get("filenumber").value;
    user.rol = this.encodeRol(this.form.get("rol").value);

    //address data
    user.street = this.form.get("street").value;
    user.number = this.form.get("number").value;
    user.city = this.form.get("city").value;
    user.floor = this.form.get("floor").value;
    user.department = this.form.get("department").value;
    user.clarification = this.form.get("clarification").value;

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
             this.vibration.vibrate(500);
            this.storage.get("jwt")
              .then(jwt => this.createNewUser(jwt))
              .catch(() => {
                this.showErrorMessage("Usuario no válido");//No tiene credenciales
                this.nativeAudio.play('error', () => console.log('Encuesta guardada'));
              });
          }
        }
      ]
    });
    confirm.present();
  }


  createNewUser(jwt) {
    this.hideSpinner = false;
    let user = this.formToObject();
    this.appService.newUser(user, jwt).then((response) => {
      this.hideSpinner = true;
      if (response.status == 200) {
        this.showErrorMessage("El usuario ha sido creado exitosamente");
        this.nativeAudio.play('bien', () => console.log('Encuesta guardada'));
        this.vibration.vibrate(500);
        this.form.reset();
      } else {
        this.showErrorMessage("No tiene permisos para realizar esta acción"); //No tiene permisos.
     this.nativeAudio.play('error', () => console.log('Encuesta guardada'));
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
