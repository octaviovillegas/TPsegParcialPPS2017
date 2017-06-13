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
import { QuestionViewer } from "../pages/question-viewer/question-viewer";
import { DivisionsListPage } from "../pages/divisions-list-page/divisions-list-page";
import { SubjectsListPage } from "../pages/subjects-list-page/subjects-list-page";
import { StudentsListPage } from "../pages/students-list-page/students-list-page";
import { ClassroomsListPage } from "../pages/classrooms-list-page/classrooms-list-page";
import { ClassesGridPage } from "../pages/classes-grid-page/classes-grid-page";
import { TeachersListPage } from "../pages/teachers-list-page/teachers-list-page";

import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

//Custom components
import { QuestionListViewerComponent } from "../components/question-list-viewer-component/question-list-viewer-component";
import { QuizManagerComponent } from "../components/quiz-manager-component/quiz-manager-component";
import { SubjectListComponent } from "../components/subject-list-component/subject-list-component";
import { AttendanceListManagerComponent } from "../components/attendance-list-manager-component/attendance-list-manager-component";
import { NewQuizComponent } from "../components/new-quiz-component/new-quiz-component";
import { DeleteQuizComponent } from "../components/delete-quiz-component/delete-quiz-component";
import { ModifyQuizComponent } from "../components/modify-quiz-component/modify-quiz-component";
import { UpdateQuizComponent } from "../components/update-quiz-component/update-quiz-component";
import { UserManagerComponent } from "../components/user-manager-component/user-manager-component";
import { NewUserComponent } from "../components/new-user-component/new-user-component";
import { DeleteUserComponent } from "../components/delete-user-component/delete-user-component";
import { ModifyUserComponent } from "../components/modify-user-component/modify-user-component";

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
    QuestionListViewerComponent,
    NewUserComponent,
    UpdateQuizContainerPage,
    UserManagerComponent,
    QuizManagerComponent,
    SubjectListComponent,
    AttendanceListManagerComponent,
    NewQuizComponent,
    DeleteQuizComponent,
    ModifyQuizComponent,
    DeleteUserComponent,
    ModifyUserComponent,
    UpdateQuizComponent,
    QuestionViewer,
    DivisionsListPage,
    SubjectsListPage,
    StudentsListPage,
    ClassroomsListPage,
    ClassesGridPage,
    TeachersListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, 
    IonicStorageModule.forRoot()
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
    QuestionListViewerComponent,
    NewUserComponent,
    UpdateQuizContainerPage,
    UserManagerComponent,
    QuizManagerComponent,
    SubjectListComponent,
    AttendanceListManagerComponent,
    NewQuizComponent,
    DeleteQuizComponent,
    ModifyQuizComponent,
    DeleteUserComponent,
    ModifyUserComponent,
    QuestionViewer,
    DivisionsListPage,
    SubjectsListPage,
    StudentsListPage,
    ClassroomsListPage,
    ClassesGridPage,
    TeachersListPage,
    UpdateQuizComponent,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppService,
    Vibration,
    NativeAudio
  ]
})
export class AppModule {}
