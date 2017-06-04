import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteQuizComponent } from './delete-quiz-component';

@NgModule({
  declarations: [
    DeleteQuizComponent,
  ],
  imports: [
    IonicPageModule.forChild(DeleteQuizComponent),
  ],
  exports: [
    DeleteQuizComponent
  ]
})
export class DeleteQuizComponentModule {}
