import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyQuizComponent } from './modify-quiz-component';

@NgModule({
  declarations: [
    ModifyQuizComponent,
  ],
  imports: [
    IonicPageModule.forChild(ModifyQuizComponent),
  ],
  exports: [
    ModifyQuizComponent
  ]
})
export class ModifyQuizComponentModule {}
