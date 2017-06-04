import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionListViewerComponent } from './question-list-viewer-component';

@NgModule({
  declarations: [
    QuestionListViewerComponent,
  ],
  imports: [
    IonicPageModule.forChild(QuestionListViewerComponent),
  ],
  exports: [
    QuestionListViewerComponent
  ]
})
export class QuestionListViewerComponentModule {}
