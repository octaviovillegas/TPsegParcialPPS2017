import { Component } from '@angular/core';

@Component({
  selector: 'question-list-viewer-component',
  templateUrl: 'question-list-viewer-component.html'
})
export class QuestionListViewerComponent {

  text: string;

  constructor() {
    console.log('Hello QuestionListViewerComponent Component');
    this.text = 'Estás viendo el contenido del componente QuestionListViewerComponent';
  }

}
