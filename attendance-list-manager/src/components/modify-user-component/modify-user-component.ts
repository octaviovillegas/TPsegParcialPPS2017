import { Component } from '@angular/core';

/**
 * Generated class for the ModifyUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'modify-user-component',
  templateUrl: 'modify-user-component.html'
})
export class ModifyUserComponent {

  text: string;

  constructor() {
    console.log('Hello ModifyUserComponent Component');
    this.text = 'Estás viendo el contenido del componente ModifyUserComponent';
  }

}
