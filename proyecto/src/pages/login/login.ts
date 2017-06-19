import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading  } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import { User } from '../servicioAuth/user';
import { AuthData } from '../../providers/auth-data';
import { Menu } from '../menu/menu';
import { Device } from '@ionic-native/device';
import { NativeAudio } from '@ionic-native/native-audio';
import 'rxjs/Rx';
import { Vibration } from '@ionic-native/vibration';
import { ActionSheetController } from 'ionic-angular';
import { AcercaDePage } from '../acerca-de-page/acerca-de-page';

@Component({
    selector: 'page-login',
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
        public authData: AuthData, private dev: Device,private nativeAudio: NativeAudio,public vibration:Vibration,
        public actionSheetCtrl: ActionSheetController)
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
                            this.vibration.vibrate([100]);

                            this.loading.dismiss().then(() => {
                                this.usuarioLogueado = this.auth.getUserInfo();
                                this.navCtrl.setRoot(Menu, this.usuarioLogueado);
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
                        this.showError(JSON.stringify(error));
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

    loginWithGithub() {
        // Muestro el loading.
        this.showLoading().then(() => {

            console.log('github');

            // Inicio sesion en Firebase con Github.
            this.authData.loginWithGithub().then( result => {

                let token = result.credential.accessToken;
                // The signed-in user info.
                let user = result.user;

                console.log('loginWithGithub: ', user);
                this.auth.currentUser = new User(user.uid, user.email, '', 'Profesor');
                this.auth.currentUser.id_tipo = 4;
                console.log('this.auth.currentUser: ', this.auth.currentUser);


                this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
                this.vibration.vibrate([100]);

                this.loading.dismiss().then(() => {
                    this.usuarioLogueado = this.auth.getUserInfo();
                    console.log('userLogueado: ', this.usuarioLogueado);
                    this.navCtrl.setRoot(Menu, this.usuarioLogueado);
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

            }).catch(e => {

                this.loading.dismiss().then(() => {
                    let errorMessage = e.message;
                    this.showError('Error: ' + errorMessage);
                });

            });

        });
    }

    showLoading(): Promise<any> {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...',
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

    abrirActionSheet () {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Usuarios Test',
            buttons: [
                {
                    text: 'Administrador',
                    handler: () => {
                        this.EscribirCredenciales('Administrador');
                    }
                },
                {
                    text: 'Administrativo',
                    handler: () => {
                        this.EscribirCredenciales('Administrativo');
                    }
                },
                {
                    text: 'Profesor',
                    handler: () => {
                        this.EscribirCredenciales('Profesor');
                    }
                },
                {
                    text: 'Alumno',
                    handler: () => {
                        this.EscribirCredenciales('Alumno');
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();
    }

    acercaDe () {

        this.navCtrl.push(AcercaDePage, null, {
            direction: 'forward',
            animation: 'ios-transition'
        });

    }

}
