import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { MyApp } from './app.component';
import { assistAndAbsences } from '../pages/assistAndAbsences/assistAndAbsences';
//Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {RegisteredUserPage } from "../pages/registered-user/registered-user";
import {gestionalumno} from "../pages/gestionalumno/gestionalumno";
import {gestionprofesor} from "../pages/gestionprofesor/gestionprofesor";
import {generarencuesta} from "../pages/generarencuesta/generarencuesta";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppService } from "../providers/app-service";
import {gestionarasistencia} from "../pages/gestionarasistencia/gestionarasistencia";
import { UpdateQuizContainerPage } from "../pages/update-quiz-container-page/update-quiz-container-page";

//Custom components
import { QuestionListViewerComponentModule } from "../components/question-list-viewer-component/question-list-viewer-component.module";
import { QuizManagerComponentModule } from "../components/quiz-manager-component/quiz-manager-component.module";
import { SubjectListComponentModule } from "../components/subject-list-component/subject-list-component.module";
import { AttendanceListManagerComponentModule } from "../components/attendance-list-manager-component/attendance-list-manager-component.module";
import { NewQuizComponentModule } from "../components/new-quiz-component/new-quiz-component.module";
import { DeleteQuizComponentModule } from "../components/delete-quiz-component/delete-quiz-component.module";
import { ModifyQuizComponentModule } from "../components/modify-quiz-component/modify-quiz-component.module";
import { UpdateQuizComponentModule } from "../components/update-quiz-component/update-quiz-component.module";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisteredUserPage,
    gestionalumno,
    gestionprofesor,
    generarencuesta,
    assistAndAbsences,
    gestionarasistencia,
    UpdateQuizContainerPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, 
    IonicStorageModule.forRoot(),
    QuizManagerComponentModule,
    QuestionListViewerComponentModule,
    SubjectListComponentModule,
    AttendanceListManagerComponentModule,
    NewQuizComponentModule,
    DeleteQuizComponentModule,
    ModifyQuizComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisteredUserPage,
    gestionalumno,
    gestionprofesor,
    generarencuesta,
    assistAndAbsences,
    gestionarasistencia,
    UpdateQuizContainerPage, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppService
  ]
})
export class AppModule {}
