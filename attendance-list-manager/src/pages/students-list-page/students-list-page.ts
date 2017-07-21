import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';
import { AppService } from "../../providers/app-service";
import { Storage } from "@ionic/storage";
import { AttendanceListData } from "../../app/entities/attendanceListData";
import { AttendanceList } from "../../app/entities/attendanceList";
import { AttendanceListItem } from "../../app/entities/attendanceListItem";
import {Settings} from '../../providers/settings';

import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'page-students-list-page',
  templateUrl: 'students-list-page.html',
})
export class StudentsListPage {
  loadingPage: boolean;
  students: Array<AttendanceListData>;
  classId: number;
  noStudents: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private storage: Storage, private toastCtrl: ToastController, private alertCtrl: AlertController,private settings:Settings) {
    this.loadingPage = true;
    this.noStudents = true;
    this.students = new Array<AttendanceListData>();
  }

  ionViewDidLoad() {
    let previousView: ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if (previousView.name == "SubjectsListPage" || previousView.name == "DivisionsListPage") {
      this.getStudentsList();
    } else {
      this.getStudentsListByClassId();
    }
  }
  getStudentsList() {
    let subject = this.navParams.get("subject");
    let division = this.navParams.get("division");

    this.storage.get("jwt").then((jwt) => {
      this.appService.getStudentsListByDivisionAndSubject(jwt, division.divisionid, subject.subjectid)
        .then((response) => {
          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.setStudents(body.students);

          this.classId = body.classid;
          this.loadingPage = false;
          console.log(this.students);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Error al traer las materias");
      this.loadingPage = false;
    });
  }

  sendData() {
    console.log(this.students);
  }

  setStudents(students) {
    if (students.length > 0) {
      this.noStudents = false;
      students.forEach(student => {
        let attendanceListData = new AttendanceListData();
        attendanceListData.firstname = student.firstname;
        attendanceListData.lastname = student.lastname;
        attendanceListData.userid = student.userid;
        attendanceListData.present = false;
        this.students.push(attendanceListData);

      });
    }
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Desea guardar y enviar la lista?',
      message: 'Los datos enviados no se podrán modificar',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingPage = true;
            let attendanceList = new AttendanceList();
            this.students.forEach(student => {
              let attendancelistitem = new AttendanceListItem();
              attendancelistitem.studentid = student.userid;
              attendancelistitem.present = student.present;
              attendanceList.attendancelistitems.push(attendancelistitem);
            });
            attendanceList.classid = this.classId;
            this.storage.get("jwt").then((jwt) => {
              this.appService.saveAttendanceList(jwt, attendanceList)
                .then((response) => {
                  this.loadingPage = false;
                  this.showMessage("La lista se guardó correctamente.");
                  this.navCtrl.popToRoot();
                })
                .catch(() => {
                  console.log("Error");
                  this.loadingPage = false;
                });
            }).catch(() => {
              console.log("Error al traer las materias");
              this.loadingPage = false;
            });
          }
        }
      ]
    });
    confirm.present();
  }
    logOutOnClick() {
    this.appService.logOut();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
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
  getStudentsListByClassId() {

    this.storage.get("jwt").then((jwt) => {
      this.appService.getStudentsListByClassId(jwt, this.navParams.get("a_class").classid)
        .then((response) => {
          let body = JSON.parse(response["_body"]); //convert JSON to Object
          this.setStudents(body.students);

          this.classId = this.navParams.get("a_class").classid;
          this.loadingPage = false;
          console.log(this.students);
        })
        .catch(() => {
          console.log("Error");
          this.loadingPage = false;
        });
    }).catch(() => {
      console.log("Error al traer las materias");
      this.loadingPage = false;
    });
  }

  showMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
