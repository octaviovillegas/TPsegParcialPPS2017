import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateQuizComponent } from './update-quiz-component';

@NgModule({
  declarations: [
    UpdateQuizComponent,
  ],
  imports: [
    IonicPageModule.forChild(UpdateQuizComponent),
  ],
  exports: [
    UpdateQuizComponent
  ]
})
export class UpdateQuizComponentModule {}
