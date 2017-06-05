import { Component } from '@angular/core';

@Component({
  selector: 'update-quiz-component',
  templateUrl: 'update-quiz-component.html'
})
export class UpdateQuizComponent {

  text: string;

  constructor() {
    console.log('Hello UpdateQuizComponent Component');
    this.text = 'Estás viendo el contenido del componente UpdateQuizComponent';
  }

}
