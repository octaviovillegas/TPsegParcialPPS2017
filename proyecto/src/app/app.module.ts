import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Login} from "../pages/login/login";
import {Administrador} from "../pages/administrador/administrador";
import {Administrativo} from "../pages/administrativo/administrativo";
import {Estadisticas} from "../pages/estadisticas/estadisticas";
import { HttpModule } from '@angular/http';
import { servicioAuth } from '../pages/servicioAuth/servicioAuth';
import { Alumno } from "../pages/alumno/alumno";
import { AlumnoEncuestasPage } from '../pages/alumno-encuestas/alumno-encuestas';
import { EncuestaPage } from '../pages/encuesta/encuesta';
import {Profesor} from "../pages/profesor/profesor";
import {modalEncuesta} from '../pages/modalEncuesta/modalEncuesta';
import {firebaseconfig} from '../pages/firebase/firebase-config';
import {AngularFireModule} from 'angularfire2';
import { AuthData } from '../providers/auth-data';
import {Menu} from "../pages/menu/menu";
import {Encuestas} from '../pages/encuestas/encuestas';
import {GrillaAdministrador} from "../pages/grillas/grilla-administrador/grilla-administrador";
import {GrillaAdministrativo} from "../pages/grillas/grilla-administrativo/grilla-administrativo";
import {GrillaAlumno} from "../pages/grillas/grilla-alumno/grilla-alumno";
import {GrillaProfesor} from "../pages/grillas/grilla-profesor/grilla-profesor";
import {ModificacionModal} from "../pages/grillas/modificacion-modal/modificacion-modal";
import {AltaModal} from "../pages/grillas/alta-modal/alta-modal";
import {Modales} from '../pages/encuestas/modales/modales';
import {GenerarEncuesta} from '../pages/encuestas/generarencuesta/generarencuesta';
import {EnviarEncuesta} from '../pages/encuestas/enviarencuesta/enviarencuesta';
import {GrillaCurso} from "../pages/grillas/grilla-curso/grilla-curso";
import {GrillaComision} from "../pages/grillas/grilla-comision/grilla-comision";

import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    Administrador,
    Administrativo,
    Estadisticas,
    Alumno,
    AlumnoEncuestasPage,
    EncuestaPage,
    Profesor,
    Menu,
    GrillaProfesor,
    GrillaAlumno,
    GrillaAdministrativo,
    GrillaAdministrador,
    ModificacionModal,
    AltaModal,
    Modales,
    GenerarEncuesta,
    EnviarEncuesta,
    GrillaCurso,
    GrillaComision
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
   AngularFireModule.initializeApp(firebaseconfig)
      ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    Administrador,
    Administrativo,
    Estadisticas,
    Alumno,
    AlumnoEncuestasPage,
    EncuestaPage,
    Profesor,
    Menu,
    GrillaProfesor,
    GrillaAlumno,
    GrillaAdministrativo,
    GrillaAdministrador,
    ModificacionModal,
    AltaModal,
    Modales,
   GenerarEncuesta,
    EnviarEncuesta,
    GrillaCurso,
    GrillaComision
      ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    servicioAuth,
    AuthData,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
