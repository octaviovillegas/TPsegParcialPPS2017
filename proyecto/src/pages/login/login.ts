import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController,NavParams, Loading, IonicPage  } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Usuario} from "../usuario/usuario";
import {Http} from '@angular/http';
import {User} from '../servicioAuth/user';
import {Administrador} from "../administrador/administrador";
import {Administrativo} from "../administrativo/administrativo";
import {Alumno} from "../alumno/alumno";
import {Profesor} from "../profesor/profesor";
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { AuthData } from '../../providers/auth-data';
import { Menu } from '../menu/menu';
import { Device } from '@ionic-native/device';
import { NativeAudio } from '@ionic-native/native-audio';
import 'rxjs/Rx';
import { Vibration } from '@ionic-native/vibration';

@Component({
    selector: 'page-contact',
    templateUrl: 'login.html'
})

export class Login {

    usuarioLogueado : User;

    Login = {
        usuario: "",
        clave: ""
    }

    private device: Device;
    public loading: Loading;





    constructor(public navCtrl: NavController, private auth: servicioAuth,
        private alertCtrl: AlertController, private loadingCtrl: LoadingController,
        public authData: AuthData, private dev: Device,private nativeAudio: NativeAudio,public vibration:Vibration)
        {
        this.device = dev;
        this.nativeAudio.preloadSimple('uniqueId1', 'assets/okLogin.mp3');
        this.nativeAudio.preloadSimple('errlogin', 'assets/errLogin.mp3');
        }

    public login() {

        // Muestro el loading.
        this.showLoading().then(() => {

            // Inicio sesion en Firebase.
            this.authData.loginUser(this.Login.usuario, this.Login.clave).then( authData => {

                // Chequeo si existe el usuario en la base de datos e Inicio
                // sesion.
                this.auth.login(this.Login).subscribe(existe => {

                        if (existe) {
                            
                            this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
                            this.vibration.vibrate([200]); 

                            this.loading.dismiss().then(() => {
                                this.usuarioLogueado = this.auth.getUserInfo();

                                if (this.usuarioLogueado.tipo_usuario == "Administrador") {
                                    this.navCtrl.setRoot(Menu, this.usuarioLogueado);
                                } else
                                if (this.usuarioLogueado.tipo_usuario == "Administrativo") {
                                    this.navCtrl.setRoot(Menu, this.usuarioLogueado);
                                }else
                                if (this.usuarioLogueado.tipo_usuario == "Alumno") {
                                    this.navCtrl.setRoot(Menu, this.usuarioLogueado);
                                }
                                if (this.usuarioLogueado.tipo_usuario == "Profesor") {
                                    this.navCtrl.setRoot(Menu, this.usuarioLogueado);
                                }

                            });
                           
                            
                        } else {
                          
                            // No existe el usuario en la BD, pero si en firebase
                            // por lo tanto lo elimino de firebase.
                            
                            this.authData.removeCurrentUser().then( _ => {

                                this.loading.dismiss().then(() => {
                                    this.showError("El usuario no existe o ingresó datos invalidos.");
                                });

                            }, error => {

                                this.loading.dismiss().then(() => {
                                    this.showError("El usuario no existe o ingresó datos invalidos.");
                                });

                            });

                        }

                }, error => {

                    this.loading.dismiss().then(() => {
                        this.showError(error);
                    });

                });
            },
            error => {

                this.loading.dismiss().then(() => {

                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [{
                            text: "Ok",
                            role: 'cancel'
                        }]
                    });
                    this.vibration.vibrate([100,100,100]); 
                    this.nativeAudio.play('errlogin', () => console.log('errlogin is done playing'));
                    alert.present();

                });
            });
        });


    }

    showLoading(): Promise<any> {
        this.loading = this.loadingCtrl.create({
            content: 'Por favor espere...',
            dismissOnPageChange: true
        });
        return this.loading.present();
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Fallo',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    EscribirCredenciales(tipo){
        if (tipo == "Administrador" ) {

            this.Login.usuario = "JoseAdministrador@escuelita.com";
            this.Login.clave ="admin123";

         } else if (tipo == "Administrativo" ) {

            this.Login.usuario = "JuanAdministrativo@escuelita.com";
            this.Login.clave ="admini123";

        } else if (tipo == "Alumno" ) {

            this.Login.usuario = "MariaAlumno@escuelita.com";
            this.Login.clave ="alumno123";

        } else if (tipo == "Profesor" ) {

            this.Login.usuario = "OctavioProfesor@profesor.com";
            this.Login.clave ="profe123";

        }
    }

}
