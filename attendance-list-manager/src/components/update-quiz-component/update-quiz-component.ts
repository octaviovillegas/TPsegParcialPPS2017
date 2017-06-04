import { Component } from '@angular/core';

/**
 * Generated class for the UpdateQuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'update-quiz-component',
  templateUrl: 'update-quiz-component.html'
})
export class UpdateQuizComponent {

  text: string;

  constructor() {
    console.log('Hello UpdateQuizComponent Component');
    this.text = 'Hello World';
  }

}
