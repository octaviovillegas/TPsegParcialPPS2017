import { Component } from '@angular/core';

/**
 * Generated class for the NewQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-quiz-component',
  templateUrl: 'new-quiz-component.html'
})
export class NewQuizComponent {

  text: string;

  constructor() {
    console.log('Hello NewQuizComponent Component');
    this.text = 'Estás viendo el contenido del componente NewQuizComponent';
  }

}
