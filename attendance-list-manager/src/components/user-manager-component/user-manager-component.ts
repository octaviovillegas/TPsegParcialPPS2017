import { Component } from '@angular/core';


@Component({
  selector: 'user-manager-component',
  templateUrl: 'user-manager-component.html',

})
export class UserManagerComponent {

  text: string;
  whichComponent:string;
  constructor() {
    console.log('Hello UserManagerComponent Component');
    this.text = 'Estás viendo el contenido del componente UserManagerComponent';
  }

}
