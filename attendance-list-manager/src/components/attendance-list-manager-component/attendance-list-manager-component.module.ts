import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceListManagerComponent } from './attendance-list-manager-component';

@NgModule({
  declarations: [
    AttendanceListManagerComponent,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceListManagerComponent),
  ],
  exports: [
    AttendanceListManagerComponent
  ]
})
export class AttendanceListManagerComponentModule {}
