import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectListComponent } from './subject-list-component';

@NgModule({
  declarations: [
    SubjectListComponent,
  ],
  imports: [
    IonicPageModule.forChild(SubjectListComponent),
  ],
  exports: [
    SubjectListComponent
  ]
})
export class SubjectListComponentModule {}
