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
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
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
import {GrillaComision} from "../pages/grillas/grilla-comision/grilla-comision";
import { Toast } from '@ionic-native/toast';
import { Device } from '@ionic-native/device';
import {GrillaCurso} from "../pages/grillas/grilla-curso/grilla-curso";
import {ModificacionModalCursos} from "../pages/grillas/modificacion-modal-cursos/modificacion-modal-cursos";
import {AltaModalCursos} from "../pages/grillas/alta-modal-cursos/alta-modal-cursos";
import {Grafico1} from "../pages/graficos/grafico1/grafico1";
import {Grafico2} from "../pages/graficos/grafico2/grafico2";
import {Grafico3} from "../pages/graficos/grafico3/grafico3";
import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';
import { AlumnoCurso } from '../pages/alumno-curso/alumno-curso';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Miubicacion} from "../pages/miubicacion/miubicacion";
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { AcercaDePage } from '../pages/acerca-de-page/acerca-de-page';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { EncuestaDetalle } from "../pages/encuesta-detalle/encuesta-detalle";

import {Resultado} from "../pages/graficos/resultado/resultado";
import {EncuestaAlumno} from "../pages/encuesta-alumno/encuesta-alumno";
import {MiPerfil} from "../pages/mi-perfil/mi-perfil";
import { EstiloPropio } from '../pages/estilo-propio/estilo-propio';

import {Ayuda} from '../pages/ayuda/ayuda';


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
    GrillaComision,
    GrillaCurso,
    ModificacionModalCursos,
    AltaModalCursos,
    Grafico1,
    Grafico2,
    Grafico3,
    AlumnoCurso,
    Miubicacion,
    AcercaDePage,
    EncuestaDetalle,
    Resultado,
    EncuestaAlumno,
    MiPerfil,
    EstiloPropio,
    Ayuda
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDg5RgxfKfydP2_yidVU7ZwUW21aIqPl0Y'
    }),
   AngularFireModule.initializeApp(firebaseconfig),
   AngularFireAuthModule,
   AngularFireDatabaseModule
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
    GrillaComision,
    GrillaCurso,
    ModificacionModalCursos,
    AltaModalCursos,
    Grafico1,
    Grafico2,
    Grafico3,
    AlumnoCurso,
    Miubicacion,
    AcercaDePage,
    EncuestaDetalle,
    Resultado,
    EncuestaAlumno,
    MiPerfil,
    EstiloPropio,
    Ayuda
      ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    servicioAuth,
    AuthData,
    Device,
    Toast,
    MediaCapture,
    Camera,
    ImagePicker,
    NativeAudio,
    Vibration,
    BarcodeScanner,
    Geolocation,
    InAppBrowser,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
