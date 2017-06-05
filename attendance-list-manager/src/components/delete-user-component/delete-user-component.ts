import { Component } from '@angular/core';

/**
 * Generated class for the DeleteUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'delete-user-component',
  templateUrl: 'delete-user-component.html'
})
export class DeleteUserComponent {

  text: string;

  constructor() {
    this.text = 'Estás viendo el contenido del componente DeleteUserComponent';
  }

}
