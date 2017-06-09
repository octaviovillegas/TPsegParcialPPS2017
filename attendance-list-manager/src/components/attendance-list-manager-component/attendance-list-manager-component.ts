import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { DivisionsListPage } from "../../pages/divisions-list-page/divisions-list-page";
import { SubjectsListPage } from "../../pages/subjects-list-page/subjects-list-page";
import { ClassroomsListPage } from "../../pages/classrooms-list-page/classrooms-list-page";
import { TeachersListPage } from "../../pages/teachers-list-page/teachers-list-page";
import { ClassesGridPage } from "../../pages/classes-grid-page/classes-grid-page";

@Component({
  selector: 'attendance-list-manager-component',
  templateUrl: 'attendance-list-manager-component.html'
})
export class AttendanceListManagerComponent implements OnInit {
  text: string;
  loadingPage: boolean;
  admin: boolean;
  adminButtons: Array<any>;

  constructor(private storage: Storage, public navCtrl: NavController) {
    this.loadingPage = true;
    this.admin = false;
    this.adminButtons = [];
    this.adminButtons.push({ text: "Divisiones", page: DivisionsListPage });
    this.adminButtons.push({ text: "Asignaturas", page: SubjectsListPage });
    this.adminButtons.push({ text: "Aulas", page: ClassroomsListPage });
    this.adminButtons.push({ text: "Profesores", page: TeachersListPage });
  }


  ngOnInit(): void {
    this.storage.get("rol").then((value) => {
      this.showButtons(value);
    });
  }

  showButtons(rol) {
    if (rol == "Administrative") {
      this.admin = true
    }
    this.loadingPage = false;
  }

  pushPage(page) {
    this.navCtrl.parent.push(page);
  }


  assignedSubjectOnClick() {
    this.navCtrl.parent.push(ClassesGridPage);
  }

}
