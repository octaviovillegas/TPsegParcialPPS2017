import { Component } from '@angular/core';

/**
 * Generated class for the SubjectListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'subject-list-component',
  templateUrl: 'subject-list-component.html'
})
export class SubjectListComponent {

  text: string;

  constructor() {
    console.log('Hello SubjectListComponent Component');
    this.text = 'Estás viendo el contenido del componente SubjectListComponent';
  }

}
