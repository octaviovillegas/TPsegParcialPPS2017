import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading  } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import { User } from '../servicioAuth/user';
import { AuthData } from '../../providers/auth-data';
import { Menu } from '../menu/menu';
import { NativeAudio } from '@ionic-native/native-audio';
import 'rxjs/Rx';
import { Vibration } from '@ionic-native/vibration';
import { ActionSheetController } from 'ionic-angular';
import { AcercaDePage } from '../acerca-de-page/acerca-de-page';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class Login {

    usuarioLogueado : User;
 micolor;
    Login = {
        usuario: "",
        clave: ""
    }


    public loading: Loading;
    private browser;

    constructor(public navCtrl: NavController, private auth: servicioAuth,
        private alertCtrl: AlertController, private loadingCtrl: LoadingController,
        public authData: AuthData, private nativeAudio: NativeAudio,public vibration:Vibration,
        public actionSheetCtrl: ActionSheetController, private events: Events, private iab: InAppBrowser, private http: Http)
        {
            this.nativeAudio.preloadSimple('uniqueId1', 'assets/okLogin.mp3');
            this.nativeAudio.preloadSimple('errlogin', 'assets/errLogin.mp3');

            this.events.subscribe('auth:login:no_existe', (text) => {

                this.loading.dismiss().then(() => {
                    this.showError(text);
                });

            });
        }

    public login() {

        // Muestro el loading.
        this.showLoading().then(() => {

            // Inicio sesion en Firebase.
            this.authData.loginUser(this.Login.usuario, this.Login.clave).then(authData => {

            },
            error => {

                console.log('loginError: ', error);

                if (error) {

                    this.loading.dismiss().then(() => {
                        this.showError("El usuario no existe o ingresó datos invalidos.");
                    });

                }

            });

        });

    }

    public githubLogin(): Promise<any> {
        let s = this;
        let ignorarExit = false;
        return new Promise(function(resolve, reject) {
            s.browser = (<any>window).cordova.InAppBrowser.open('http://github.com/login/oauth/authorize?client_id=317ba416971800cbbd8e&redirect_uri=https://abmusuarios.firebaseapp.com/__/auth/handler', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');

            s.browser.addEventListener('loaderror', (event) => {
                console.log('loaderror: ', event);

                ignorarExit = true;
                s.browser.removeEventListener("exit", (event) => {});
                s.browser.close();

                let msg = event.message;
                if (event.message == 'net::ERR_NAME_NOT_RESOLVED') {
                    msg = 'Es probable que no tengas Internet. Chequea tu conexión.';
                }
                reject(msg);
            });

            s.browser.addEventListener("loadstart", (event) => {
                console.log('loadstart: ', event.url);
                if ((event.url).indexOf("https://abmusuarios.firebaseapp.com/__/auth/handler") === 0) {

                    ignorarExit = true;
                    s.browser.removeEventListener("exit", (event) => {});
                    s.browser.close();

                    let parts = event.url.split('?code=');
                    s.http.post('https://github.com/login/oauth/access_token', {
                        client_id: '317ba416971800cbbd8e',
                        client_secret: 'd2912e393e69a3c72253831be5300cf067fef112',
                        code: parts[1]
                    })
                   .map(res => res.text())
                   .subscribe((res: any) => {

                        let access_token = '';
                        let parts = res.split('&');
                        for (let part of parts) {
                            if (part.indexOf('access_token') != -1) {
                                access_token = part.replace('access_token=', '');
                                break;
                            }
                        }

                        if (access_token != '') {

                            var credential = firebase.auth.GithubAuthProvider.credential(access_token);

                            firebase.auth().signInWithCredential(credential).then((result) => {

                                console.log(result);
                                resolve(result);

                            }).catch((error:any) => {
                                // Handle Error s here.
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                // The email of the user's account used.
                                var email = error.email;
                                // The firebase.auth.AuthCredential type that was used.
                                var credential = error.credential;
                                // ...
                                reject("Error al iniciar sesión: " + errorMessage);
                            });
                        } else {
                            reject("El inicio de sesión con Github no fue autorizado.");

                        }

                    }, (error: any) => {
                        reject("El inicio de sesión de Github fue cancelado");
                        console.log('post:error: ', error);
                    });

                } else {
                    let url = event.url;
                    if (url.indexOf("client_id=317ba416971800cbbd8e") == -1 && url.indexOf('github.com/session') == -1) {
                        s.browser.close();
                    }
                }
            });
            s.browser.addEventListener("exit", function(event) {

                if (!ignorarExit) {
                    console.log('exit: ', event);
                    reject("El inicio de sesión de Github fue cancelado");
                }

                ignorarExit = false;
            });
        });
    }

    loginWithGithub() {

        this.showLoading();

        this.githubLogin().then(r => {
            console.log('success: ', r);
        }, e => {

            let alert = this.alertCtrl.create({
                message: e,
                buttons: [{
                    text: "Ok",
                    role: 'cancel'
                }]
            });
            this.vibration.vibrate([100,100,100]);
            this.nativeAudio.play('errlogin', () => console.log('errlogin is done playing'));
            alert.present();

            this.loading.dismiss();

        })
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
