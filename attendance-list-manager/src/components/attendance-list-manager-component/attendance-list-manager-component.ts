import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { DivisionsListPage } from "../../pages/divisions-list-page/divisions-list-page";
@Component({
  selector: 'attendance-list-manager-component',
  templateUrl: 'attendance-list-manager-component.html'
})
export class AttendanceListManagerComponent implements OnInit {
  text: string;
  loadingPage: boolean;
  admin: boolean;
  adminButtons:Array<any>;

  constructor(private storage: Storage, public navCtrl:NavController) {
    this.loadingPage = true;
    this.admin = false;
    this.adminButtons = [];
    this.adminButtons.push({ text: "Divisiones", page: DivisionsListPage});
    this.adminButtons.push({ text: "Asignaturas", page: DivisionsListPage});
    this.adminButtons.push({ text: "Aulas", page: DivisionsListPage});
    this.adminButtons.push({ text: "Profesores", page: DivisionsListPage});
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

  pushPage() {
    this.navCtrl.parent.push(DivisionsListPage);
  }
}
