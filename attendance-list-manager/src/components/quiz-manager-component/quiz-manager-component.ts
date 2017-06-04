import { Component } from '@angular/core';

/**
 * Generated class for the QuizManagerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'quiz-manager-component',
  templateUrl: 'quiz-manager-component.html'
})
export class QuizManagerComponent {

  text: string;

  constructor() {
    console.log('Hello QuizManagerComponent Component');
    this.text = 'Estás viendo el contenido del componente QuizManagerComponent';
  }

}
