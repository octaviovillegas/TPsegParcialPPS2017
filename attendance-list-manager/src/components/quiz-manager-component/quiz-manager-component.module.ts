import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizManagerComponent } from './quiz-manager-component';

@NgModule({
  declarations: [
    QuizManagerComponent,
  ],
  imports: [
    IonicPageModule.forChild(QuizManagerComponent),
  ],
  exports: [
    QuizManagerComponent
  ]
})
export class QuizManagerComponentModule {}
