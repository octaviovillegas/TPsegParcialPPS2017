import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewQuizComponent } from './new-quiz-component';

@NgModule({
  declarations: [
    NewQuizComponent,
  ],
  imports: [
    IonicPageModule.forChild(NewQuizComponent),
  ],
  exports: [
    NewQuizComponent
  ]
})
export class NewQuizComponentModule {}
