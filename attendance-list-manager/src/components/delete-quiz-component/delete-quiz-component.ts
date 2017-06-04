import { Component } from '@angular/core';

/**
 * Generated class for the DeleteQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'delete-quiz-component',
  templateUrl: 'delete-quiz-component.html'
})
export class DeleteQuizComponent {

  text: string;

  constructor() {
    console.log('Hello DeleteQuizComponent Component');
    this.text = 'Estás viendo el contenido del componente DeleteQuizComponent';
  }

}
